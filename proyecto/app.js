var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const {Client} = require('pg');
const client = new Client({
  user: "postgres",
  password: 123456,
  hostname: "crowpixels",
  port: 5432,
  database: "postgres"
});

execute()
async function execute(){
  try{
    await client.connect()
    console.log("Conexion realizada con exito.")
  }
  catch (ex)
  {
    console.log(`Hubo un error ${ex}`)
  }
  
 /* finally
  {
    await client.end()
    console.log("Cliente desconectado.")
  }*/
}

// client.query(select * from tabla where atributo="algo")

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

app.post("/users", function(req,res){

  client.query("insert into USUARIOS values ($1, $2)", [req.body.email,req.body.password]);
  console.log("Password: "+ req.body.password);
  console.log("Email: "+ req.body.email);
  res.send("Recibimos tus datos");

})

app.listen(8080);
