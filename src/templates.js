// const util = require("util")

function getResolvedComment(...args){
    var username = args[0];
    var date = args[1];
    if(!date) date = new Date();
    return `This question has been resolved by ${username} at ${date}.
*Beep bop, I'm a bot*`
}

module.exports = {
    getResolvedComment
}