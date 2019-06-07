//script completo
var http = require("http"),
fs = require("fs"),
parser = require("./params_parser.js");

var p = parser.parse;

http.createServer(function(req,res){

  if(req.url.indexOf("favicon.ico") > 0){return};

  fs.readFile("./index.html",function(err,html){
    
    var html_string = html.toString();
    // Expresion regular que busca en el codigo donde haya {x}
    var variables = html_string.match(/(?<=\{)(.+)(?=\})/g);
    var nombre = "";
    
    var parametros = p(req);

    for (var i = variables.length - 1; i >= 0; i--) {
      // [nombre,apellido]
      var variable = variables[i];
      // parametros[variables[i]]
      // parametros[nombre]
      html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
    };

    //Mandamos el contenido
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(html_string);
    res.end();
  });

}).listen(8080);
