import express from "express";
import WebSocket from "ws";
import http from "http";
import { parse } from "path";

const PORT = 3000;
const app = express();

app.set('view engine',"pug");
app.set('views',__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(_,res) => res.render("home"));

const handleListen = () =>{ 
    console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`)
    console.log(`✅ Server listenting on port ws://localhost:${PORT} 🚀`)
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


const sockets = [];

wss.on("connection",(socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close",() => console.log("Disconnected to Browser X"))
    socket.on("message",(msg) => {
        const translatedMessageData = msg.toString('utf8');
        const message= JSON.parse(translatedMessageData);
        console.log(message,translatedMessageData);
        switch(message.type){
        case "new_message":
          sockets.forEach((aSocket) =>aSocket.send(`${socket.nickname}: ${message.payload}`));
          break;
        case "nickname":
         socket["nickname"] = message.payload
         break;

    }
    });
});

server.listen(PORT,handleListen);