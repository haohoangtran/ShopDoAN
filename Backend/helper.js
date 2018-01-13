const sql = require('mssql');
const config = require('./config');
const utils = require('./util');

function login(email, password, callback) {
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, utils.getMD5FromString(password))
            .execute('usp_HaoHt_User_CheckUserLogin')
    }).then(result => {
        callback(null, result);
    }).catch(err => {
        callback(err, null);
        console.log("login", err)
    });
};

function register(email, password, name, callback) {
   const pool= new sql.ConnectionPool(config, err => {
        // ... error checks

        // Stored Procedure

        pool.request() // or: new sql.Request(pool2)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, utils.getMD5FromString(password))
            .input('name', sql.NVarChar, name)
            .execute('usp_HaoHt_User_Register', (err, result) => {
                callback(err,result.recordset[0])
                console.dir(result)
            })
    });

    pool.on('error', err => {
        console.log(err)
    });
}
function verifyUser(id,code,callback) {
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request()
            .input('id', sql.Int, id)
            .input('code', sql.Int, code)
            .execute('usp_HaoHt_User_VerifyUser')
    }).then(result => {
        callback(null, result);
    }).catch(err => {
        callback(err, null);
        console.log("login", err)
    });

}

module.exports = {
    login, register,verifyUser
}

