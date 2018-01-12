let app = require('express')();
const helper = require('./helper')
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
                IdUser: result.recordset[0].id
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
    helper.register(obj.email, obj.password,obj.name, (err, result) => {
        console.log(result)
        if (result && result.recordset[0].ID) {
            res.send({
                status:true,
                id:result.recordset[0].ID
            })
        } else {
            res.send({
                status:false,
                id:null
            })
        }
    })
});
