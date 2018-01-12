import {Component} from 'react'
import sql from 'mssql';
import config from 'config'
export default class Helper{
    constructor(props){

    }
    checkUser(email,password){
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
                .input('email', sql.NVarChar, email)
                .input('password', sql.NVarChar, password)
        }).then(result => {
            callback(null, result);
        }).catch(err => {
            callback(err, null);
            console.log("checkUser", err)
        });
    }

}