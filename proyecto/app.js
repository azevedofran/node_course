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

app.get("/persona",function (req,res){
  res.render("persona")
});

app.get("/capacitacion",function (req,res) {
  res.render("capacitacion")
});

app.post("/users", function(req,res,ret){
  client.query("select usu_id from usuarios where usu_id='"+req.body.usuario+"'").then(rows=>{
    console.log(rows.rowCount);
    if (req.body.password == req.body.password_confirmation && rows.rowCount<=0 ){
      client.query("insert into USUARIOS values ($1, $2)", [req.body.usuario,req.body.password]);
      console.log("Password: "+ req.body.password);
      console.log("Usuario: "+ req.body.usuario);
      res.send("Recibimos tus datos");
    }else if (req.body.password != req.body.password_confirmation){
      res.send("El password indicado no esta bien");
    }else if (rows.rowCount>0){
      res.send("El usuario ya existe");
    }
  })
})
// client.query(select * from tabla where atributo="algo")
app.post("/usersLogin", function(req,res,ret){
  client.query("select usu_contrasena from usuarios where usu_id ='"+
  req.body.usuario+"'").then(rows=>{
      var consulta = rows.rows[0].usu_contrasena;
      if (consulta == req.body.password){
        res.send("Usuario Validado");
      }else{
        res.send("Usuario o Contrasena invalido");
      }
  })
})

app.post("/persona", function(req,res,ret){
  client.query("select per_cedula from persona where per_cedula='"+
  req.body.per_cedula+"'").then(rows=>{
    if (rows.rowCount <=0){
      if (req.body.per_nombre2==''){
        var nombre2=null;
      }
      if (req.body.per_apellido2==''){
        var apellido2=null;
      }
      client.query("insert into PERSONA values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [req.body.per_cedula,req.body.per_nombre,nombre2,req.body.per_apellido,apellido2,req.body.per_fecha_nacimiento,req.body.per_edo_civil,req.body.per_correo,req.body.per_genero,req.body.per_profesion]); 
      res.send("Persona Fue Agregada");
    } else{
      res.send("Persona Ya Existe");
    }
  })
})
app.post("/capacitacion", function(req,res,ret){
 client.query("select per_cedula from PERSONA where per_cedula ='"+
  req.body.cap_persona+"'").then(rows=>{
    if(rows.rowCount >0){
      client.query("insert into CAPACITACION values ($1, $2, $3, $4, $5, $6)", [req.body.cap_persona,req.body.cap_institucion,req.body.cap_curso,req.body.cap_descripcion,req.body.cap_fecha,req.body.cap_horas]); 
      res.send("capacitacion Fue Agregada");
    }else{
      res.send("La persona no existe");
    }
   
  })
})
app.listen(8080);
