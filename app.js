const io = require("socket.io")(3000);

const Users = {};


io.on("connection",socket => {
    
    socket.on("send-chatMessage",message => {
        socket.broadcast.emit("init-msg",{message: message,userName: Users[socket.id]});
    })

    socket.on("new-user",user => {
        Users[socket.id] = user;
        socket.broadcast.emit("user-connected",user);
        console.log(Users)
    })

    socket.on("disconnect",() => {
        socket.broadcast.emit("user-disconnect",Users[socket.id]);
        delete Users[socket.id]
    })
})