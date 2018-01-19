let app = require('express')();
const helper = require('./helper')
const fetch = require('node-fetch')
const mail = require('./mail')
var getJSON = require('get-json')
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
                isActive: result.recordset[0].isActive,
                user: result.recordset[0]
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
        if (result && result.ID) {
            mail.sendMailRegister(result.Name, result.Code, result.ID, obj.email);
            respon = {
                status: true,
                id: result.ID
            }
        } else {
            respon = {
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
    helper.getAllFood((err, result) => {
        res.send(result.recordset)
    })
});
app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    helper.getUserFromId(id, (err, result) => {
        res.send(result.recordset[0] || {})
    });
});
app.post('/order', (req, res) => {
    let obj = req.body;
    helper.insertOrder(obj.inputStr, obj.idUser, obj.address, obj.phoneNumber, (err, result) => {
        if (result) {
            res.send({
                status: true
            })
        } else {
            res.send({
                status: false
            })
        }
    })
});
app.get('/get/order/:id', (req, res) => {
    let id = req.params.id;
    helper.getAllOrder(id, (err, result) => {
        if (result) {
            res.send(result.recordset)
        } else {
            res.send([])
        }
    })
})
app.get('/get/food/:id', (req, res) => {
    let id = req.params.id;
    helper.getFoodById(id, (err, result) => {
        if (result && result.recordset[0]) {
            res.send({...result.recordset[0], status: true})
        } else {
            res.send({status: false})
        }
    })
})
app.post('/rate', (req, res) => {
    let obj = req.body;
    console.log(obj)
    helper.rateFood(obj.idUser, obj.idFood, obj.rate, (err, result) => {
        if (err) {
            res.send({status: false})
        } else {
            res.send({status: true})
        }
    })
})
app.get('/comment/:idFood', (req, res) => {
    let idFood = req.params.idFood;
    helper.getAllComment(idFood, (err, result) => {
        if (err) {
            res.send([])
        } else {
            res.send(result.recordset)
        }
    })
})
app.post('/comment', (req, res) => {
    let obj = req.body
    console.log(obj);
    helper.commentFood(obj.idUser, obj.idFood, obj.content, (err, result) => {
        if (err) {
            res.send({status: false})
        } else {
            res.send({status: true})
        }
    })
})
app.post('/getLocation', (req, res) => {
    let obj = req.body
    let from = "175 Tây Sơn, Trung Liệt, Đống Đa, Hà Nội"
    let API_KEY = "AIzaSyCEB4QVng3uFEQ-SwxfwOWAG4H3sr7Mfi8"
    let url_request = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${obj.address + ", Hà Nội"}&mode=driving&language=vi-VN&key=${API_KEY}`

    fetch(url_request)
        .then(response => response.json())
        .then(json => console.log(json));

})