const sql =require('mssql');
const config =require('./config');
const utils=require('./util');

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
function register(email,password,callback) {
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, utils.getMD5FromString(password))
            .execute('usp_HaoHt_User_Register')
    }).then(result => {
        callback(null, result);
    }).catch(err => {
        callback(err, null);
        console.log("login", err)
    });
}

module.exports={
     login,register
}

