var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// Hace llamada a la conexion de User
var client = require("./models/user").client;

app.use("/public", express.static('public'));
app.use(bodyParser.json()); // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "jade");

app.get("/",function (req,res) {
  res.render("index")
});

app.get("/login",function (req,res) {
  res.render("login")
});

app.post("/users", function(req,res,ret){
  
  if (req.body.password == req.body.password_confirmation){
    client.query("insert into USUARIOS values ($1, $2)", [req.body.email,req.body.password]);
    console.log("Password: "+ req.body.password);
    console.log("Email: "+ req.body.email);
    res.send("Recibimos tus datos");
  }else{
    res.send("El password indicado no esta bien");
  }
})

app.listen(8080);
