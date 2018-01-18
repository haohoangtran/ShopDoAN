let app = require('express')();
const helper = require('./helper')
const mail = require('./mail')
let server = require('http').Server(app);
let io = require('socket.io')(server);
server.listen(6969);
let bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.post('/login', (req, res) => {
    let obj = req.body;
    helper.login(obj.email, obj.password, (err, result) => {
        console.log(err, result)
        let respon = {}
        if (result && result.recordset[0]) {
            respon = {
                status: true,
                IdUser: result.recordset[0].id,
                isActive:result.recordset[0].isActive,
                user:result.recordset[0]
            }
        } else {
            respon = {
                status: false,
                IdUser: null
            }
        }
        res.send(
            respon
        )
    });
});
app.post('/register', (req, res) => {
    let obj = req.body;
    console.log(obj)
    helper.register(obj.email, obj.password, obj.name, (err, result) => {
        let respon = {}
        if (result&&result.ID) {
            mail.sendMailRegister(result.Name, result.Code, result.ID, obj.email);
            respon={
                status: true,
                id: result.ID
            }
        } else {
            respon={
                status: false,
                id: null
            }
        }
        res.send(
            respon
        )
    })
});
app.get('/verify', (req, res) => {
    let id = req.query.id
    let code = req.query.code;
    helper.verifyUser(id, code, (err, result) => {
        if (result && result.recordset[0].value) {
            res.redirect('http://localhost:3000')
        } else {
            res.send('Url khong kha dung')
        }
    });
});
app.get('/', (req, res) => {
    res.send('hi')
});
app.get('/food', (req, res) => {
    helper.getAllFood((err,result)=>{
        res.send(result.recordset)
    })
});
app.get('/user/:id', (req, res) => {
    let id =req.params.id;
    helper.getUserFromId(id,(err,result)=>{
        res.send(result.recordset[0]||{})
    })
});