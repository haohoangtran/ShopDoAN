const md5 = require('js-md5');

function getMD5FromString(input) {
    return md5(input)
}


module.exports ={
    getMD5FromString
}