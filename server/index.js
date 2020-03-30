const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require ('./users.js');


//specifing the port 
const PORT = process.env.PORT || 5000;

const router =require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);//instance of socket io 


io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const{error, user} = addUser({id:socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user:'admin', text:`${user.name}, welcome to room ${user.room}`});/*greating message to the user*/
        socket.broadcast.to(user.room).emit('message', { user:'admin', text:`${user.name} has joined!`});/*informs the other users that user has joined the chat*/
        

        socket.join(user.room); //joins user to room
        io.to(user.room).emit('roomData',{room:user, users:getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);//get specific user
        
        io.to(user.room).emit('message', {user:user.name, text:message});
        io.to(user.room).emit('roomData', {user:user.room, text:message});
        
        callback();
    });

    socket.on('disconnect', () => {
       
       const user = removeUser(socket.id); //when someone leaves the chat
    
       if(user) {
        io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });

       }
    })
});

app.use(router);
app.use(cors());

//make server running 
server.listen(PORT, () => console.log(`The server has started on port ${PORT}`));


//admin messages are message
//the user messages are sendMessage
//the on function takes two parameters keyword on a string , arrow function as seen in socket.on

//socket. brodcast sends message to all the other users except you
//in the node we use require statement in place of import statements
//inbuilt node module (http)