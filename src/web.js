const controller = {};
var express = require('express');
var app = express();
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
console.log('listening on *:'+port);
});

controller.broadcast = (msg) => {
   io.emit("ratelimitChanged",msg);
};
