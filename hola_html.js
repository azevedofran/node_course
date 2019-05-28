var http = require("http"),
    fs = require("fs");

fs.readFile("./index.html",function(err,html){
  http.createServer(function(req,res){
    res.write(html);
    res.end();
  }).listen(8080);  
});
 
/*var http = require("http"),
    fs = require("fs");

http.createServer(function(req,res){
  fs.readFile("./index.html",function(err,html){
    res.writeHead(200,{"Content-Type":"application/json"});
    res.write(JSON.stringify({nombre:"Francisco", username:"francisco"}));
    res.end();
  });
}).listen(8080);*/