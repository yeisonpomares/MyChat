const express = require("express");
const expressSession = require("express-session");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");
const SocketIO = require("socket.io");

const app = express();

//Use body-parse for forms element
app.use(bodyparser.urlencoded({extended: true}));
//Use express-session
var session = app.use(expressSession({resave:true, saveUninitialized:true, secret: '1A2F34SRW72HSAYHUJD837DS'}));


//settings
app.set('port', process.env.PORT || 4000);


//static files
app.use(express.static(path.join(__dirname, 'public')));


//Init Server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});
//Websocket on server
const io = SocketIO(server);