var express = require('express');
var app = express();
const bot = require("./app")
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
   res.send("Hello world!"+bot.r.ratelimitRemaining);
});

app.listen(port);

