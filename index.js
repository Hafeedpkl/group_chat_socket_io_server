const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.route("/").get((req,res)=>{
    res.json("Hey there welcome")
})
io.on("connection",(socket)=>{
socket.join( "anonymous_group") ;
console.log("backend connected");
socket.on("sendMsg",(msg)=>{
    console.log("✉️  msg ",msg);
    // socket.emit("sendMsgServer",{...msg,type:"otherMsg"},)
    io.to("anonymous_group").emit("sendMsgServer",{...msg,type:"otherMsg"},)
})
})
httpServer.listen(3000)