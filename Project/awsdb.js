
const mysql = require('mysql');
let express = require('express');
const expApp = express();
let socket = require("socket.io");
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs')
var nb = require('buffer');
var cookieParser = require('cookie-parser');
const req = require('express/lib/request');
const { equal } = require('assert');
const router = express.Router();
const db = mysql.createConnection({
    host: "xv-db.cbbcel7ahipi.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "3RpePTwPyWsYa60kTP3BNTFP0EpMibbbmrgQ97tb",
    port: 3306,
    database: "exVaultDB"
});
let curServer = "";
let app = express();

//Cookie code from https://stackoverflow.com/questions/16209145/how-can-i-set-cookie-in-node-js-using-express-framework

app.use(cookieParser())
/*
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});
*/
app.use(express.json());
// let static middleware do its job
app.use(express.static('public'))
app.post('/json-handler', (req, res) => {
    db.connect(function (err) {
        var sql = "INSERT INTO users (userID, password) VALUES (" + "'" + req.body.email + "'" + "," + "'" + req.body.password + "'" + ")";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    });
});
app.post('/json-handler1', (req, res) => {
    db.connect(function (err) {
        db.query("SELECT userID, password FROM users WHERE userID='" + req.body.email + "'" + " AND " + "password='" + req.body.password + "'", function (err, result, fields) {
            if (err) throw err;
            //https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
        });

    });
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/ActiveRooms.html');
});

app.get('/new', (req, res) => {
    res.sendFile(__dirname + '/SignUp.html');
});

app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/CreateServer.html');
});
app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/EnterServer.html');
});
app.post('/leaveroom', (req, res) => {
    db.query("DELETE FROM roomUser WHERE user='" + req.cookies.username + "' AND room='" + req.body.ServerName + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
    });
});
app.get('/inrooms', (req, res) => {
    db.query("SELECT room FROM roomUser WHERE user='" + req.cookies.username + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
        res.send(JSON.stringify(result));
    });
});
app.post('/createServer', (req, res) => {
    db.connect(function (err) {
        var sql = "INSERT INTO rooms (roomsID, password, userNo) VALUES (" + "'" + req.body.ServerName + "'" + "," + "'" + req.body.Password + "'" + "," + "1" + ")";
        console.log(req.body.ServerName)
        console.log(req.body.Password)
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        sql = "INSERT INTO roomUser (user,room) VALUES (" + "'" + req.cookies.username + "'" + "," + "'" + req.body.ServerName + "'" + ")";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
});
app.post('/joinServer', (req, res) => {
        db.connect(function (err) {
            db.query("SELECT roomsID, password FROM rooms WHERE roomsID='" + req.body.ServerName + "'" + " AND " + "password='" + req.body.Password + "'", function (err, result, fields) {
                if (err) throw err;
                //https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
                //console.log(result[0].roomsID)
                sql = "INSERT INTO roomUser (user,room) VALUES (" + "'" + req.cookies.username + "'" + "," + "'" + result[0].roomsID + "'" + ")";
                db.query(sql, function (err1, result1) {
                    if (err1) throw err1;
                    console.log("1 record inserted");
                });
            
            });
    });  
    curServer = req.body.ServerName 
});
app.post('/joinexisting', (req, res) => {
curServer = req.body.ServerName 
});
app.get('/chatroom', (req, res) => {
    console.log("chatroom")
    res.sendFile(__dirname + '/ChatScreen.html');
});
app.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/DirectoryList.html');
});
app.get('/getUser', (req, res) => {
    res.send(req.cookies.username);
});
app.get('/getRoom', (req, res) => {
    res.send(curServer);
    //curServer = ""
});
app.get('/getMessages', (req, res) => {
    db.query("SELECT userID,content FROM messages WHERE roomID='" + curServer + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result)
        res.send(JSON.stringify(result));
    });
    //curServer = ""
});
app.post('/uploadFile', (req, res) => {
    console.log(req.body)
    let buffer = Buffer.from(req.body.fcontent)
    buffer64 = buffer.toString('base64');
    fs.writeFileSync(req.body.fname, buffer64);
    fs.readFile(req.body.filecontent, 'base64', (err, data) => {
        if (err) throw err;
        var sql = "INSERT INTO files (fileName, fileBLOB) VALUES ('" + req.body.filename+ "', " + "'" + data + "'" + ")";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        db.query("SELECT fileBLOB FROM files WHERE fileID='Project_Proposal4.pdf'", function (err, result, fields) {
            if (err) throw err;
            //https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
            let buff = new Buffer(data, 'base64');
            fs.writeFileSync('Project_Proposal3.pdf', buff);
        });
    });
    res.send(req.cookies.username);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
});

let server = app.listen(3000);
let io = socket(server);


db.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
    io.sockets.on('connection', (socket) => {
        console.log(socket.connected);
        console.log(io.engine.clientsCount);
        socket.join(curServer);
        //DO NOT DELETE THE BELOW COMMENTED CODE IS ESSENTIAL FOR FILE MANIPULATION IN DB
        /*
        fs.readFile('/Users/Nathan/Group17_GroupProject_SENG513/server/Project_Proposal1.pdf', 'base64', (err, data) => {
            if (err) throw err;
            var sql = "INSERT INTO files (fileID, fileBLOB) VALUES ('Project_Proposal5.pdf', " + "'" + data + "'" + ")";
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            db.query("SELECT fileBLOB FROM files WHERE fileID='Project_Proposal4.pdf'", function (err, result, fields) {
                if (err) throw err;
                //https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/
                let buff = new Buffer(data, 'base64');
                fs.writeFileSync('Project_Proposal3.pdf', buff);
            });
        });
        */
    });
    io.sockets.on('connection', (socket) => {
        socket.on('chatmessage', (usr, msg,room) => {
            var sql = "INSERT INTO messages (userID, roomID, content) VALUES (" + "'" + usr + "'" + "," + "'" + room + "'" + "," + "'" + msg + "'" +")";
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            socket.to(room).emit('updatemessage', usr, msg);
            /*
            var sql = "INSERT INTO users (userID, password) VALUES (" + "'" + username + "'" + "," + "'" + password + "'" + ")";
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            */
        });
    });
    io.sockets.on('connection', (socket) => {
        socket.on('fileUpload', (fname, furl) => {
            let buffer = Buffer.from(furl)
            buffer64 = buffer.toString('base64');
            fs.writeFileSync(fname, buffer64);
        });
    });
});
