const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000 || process.env.PORT;

const messageFormatter = require("./utilities/messages"); //formats a message to be sent taking into account the chosen colour
const {joinUser, getCurrentUser, userDisconnect, getUsers, changeUsername} = require("./utilities/users"); //some functions to help with user list maintenance

const admin = "ChatBot"; //username of the room moderator

let current_messages = []; //message history

app.use(express.static(path.join(__dirname, 'public'))); //application path

//when client connects
io.on('connection', (socket) => {

    //a user joins the chat room
    socket.on('join chat', (username, color) => {

        //append the user ot the current user list
        const the_user = joinUser(socket.id, username, color);

        //welcome the single user to the chat
        socket.emit('message', messageFormatter(admin, 'Welcome to SENG 513 chat room', "#000000"), "#000000");

        //display users of the chat
        io.emit("chat users", {users: getUsers()})

        //display messages
        if(current_messages.length > 0){
            for(let i = 0; i < current_messages.length; i++){
                socket.emit('message', current_messages[i], current_messages[i].color);
            }
        }

        //broadcast when a user enters the room
        socket.broadcast.emit('message', messageFormatter(admin, `${username} has joined the chat`, "#000000"), "#000000");
    })

    //when a user sends a message
    socket.on('chat message', (message, username, color) => {
        current_messages.push(messageFormatter(username, message, color)); //push message to message history
        io.emit('message', messageFormatter(username, message, color), color); //send the message to be displayed to all users
    })

    //allow the user to change the username and colour
    socket.on('change username', (username, color) => {
        changeUsername(socket.id, username, color); //updates the user list
        io.emit('chat users', {users: getUsers()}); //sends updated user list to display on client
    })

    //when the client disconnects
    socket.on('disconnect', () => {
        if(getUsers().length > 0){ //if the user list has users
            let the_user = userDisconnect(socket.id); //remove the user from the list

            io.emit('message', messageFormatter(admin, `${the_user.username} has left the chat`, "#000000"), "#000000"); //send exit message to clients
    
            //display users of the chat
            io.emit("chat users", {users: getUsers()})// send the updated user list
        }

    });
    
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));