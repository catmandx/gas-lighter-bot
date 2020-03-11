require('dotenv').config();
const templ = require("./templates.js")
require("util")
var username = "/u/catmandx";
var date = new Date();

// console.log(templ.getResolvedComment(username, date));
var obj = JSON.parse(process.env.FIREBASE_ADMIN_CRED);
console.log(obj)

var admin = require('firebase-admin');
admin.initializeApp({
    credential:admin.credential.cert(obj)
// ,
//     databaseURL:"abc",
//     databaseAuthVariableOverride:"abc"
});