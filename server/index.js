const express = require('express');
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const router = require('./router');
const app = express();

const {addUser,removeUser,getUserInRoom, getUser}=require('./users');

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

//const io = socketio(server);


io.on('connection',(socket)=>{
    console.log("new connection");
    socket.on('join',({name,room},callback)=>{
        const {user, error } = addUser({ id: socket.id, name, room });
        if(error) return callback (error);
        socket.emit('message',{user:'admin',text:`hello ${user.name} welcome to ${user.room}`});
        socket.join(user.room);
        callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name,text:message});
        console.log(message,user.room)
        callback();
    });
    socket.on('disconnect',()=>{console.log("user disconected")})

});

app.use(cors({credentials: true, origin: true}));
    app.use(router);
   


server.listen(PORT, ()=>{console.log(`server started on ${PORT}`)})