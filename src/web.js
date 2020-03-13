const controller = {};
var express = require('express');
var app = express();
const wakeDyno = require("woke-dyno");
const bot = require("./app").initializeBot(controller);

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
   res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
   console.log('a user connected');
});
 
http.listen(port, ()=>{
   // wakeDyno("https://gas-lighter-bot.herokuapp.com/").start(); 
   console.log('listening on *:'+port);
});

controller.broadcast = (msg) => {
   io.emit("ratelimitChanged",msg);
};
