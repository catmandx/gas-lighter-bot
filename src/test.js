require('dotenv').config();
const templ = require("./templates.js")
require("util")
var username = "/u/catmandx";
var date = new Date();

// console.log(templ.getResolvedComment(username, date));
var obj = JSON.parse(process.env.COMMENT_STREAM_OPTION);
console.log(obj)
