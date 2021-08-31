import express from "express";

const PORT = 3000;
const app = express();

app.set('view engine',"pug");
app.set('views',__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res) => res.render("home"));

const handleListen = () => console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`)

app.listen(PORT,handleListen);
