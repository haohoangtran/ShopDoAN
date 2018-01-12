import md5 from 'js-md5';

function getMD5FromString(input) {
    return md5(input)
}


export {
    getMD5FromString
}