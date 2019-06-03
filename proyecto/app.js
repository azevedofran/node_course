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

app.get("/registrar",function (req,res) {
  res.render("registrar")
});

app.post("/users", function(req,res,ret){
  
  if (req.body.password == req.body.password_confirmation){
    client.query("insert into USUARIOS values ($1, $2)", [req.body.usuario,req.body.password]);
    console.log("Password: "+ req.body.password);
    console.log("Usuario: "+ req.body.usuario);
    res.send("Recibimos tus datos");
  }else{
    res.send("El password indicado no esta bien");
  }
});
// client.query(select * from tabla where atributo="algo")
app.post("/usersLogin", function(req,res,ret){
  client.query("select usu_contrasena from usuarios where usu_id ='"+
    req.body.usuario+"'").then(rows=>{
      console.log(rows);
      res.send("Resultado del query: "+rows);
  });
})

app.listen(8080);
