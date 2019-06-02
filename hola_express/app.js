var express = require("express");

var app = express();

app.set("view engine", "jade");
app.get("/",function function_name(req,res) {
  res.render("index",{hola: "Hola Francisco"});
});

app.listen(8080);