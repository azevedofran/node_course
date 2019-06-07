var express = require("express");

var app = express();

app.set("view engine", "jade");

//Verbos HTTP => GET / POST / PUT / PATCH / DELETE
//REST

app.get("/",function (req,res) {
  res.render("index");
});

app.get("/:nombre",function(req,res){
  res.render("form",{nombre: req.params.nombre});
})

app.post("/",function(req,res){
  res.render("form");
});

app.listen(8080);
