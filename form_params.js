//script completo
var http = require("http"),
fs = require("fs");

http.createServer(function(req,res){

  if(req.url.indexOf("favicon.ico") > 0){return};

  fs.readFile("./index.html",function(err,html){
    
    var html_string = html.toString();
    var arreglo_parametros = [], parametros = {};
    // Expresion regular que busca en el codigo donde haya {x}
    var variables = html_string.match(/(?<=\{)(.+)(?=\})/g);
    var nombre = "";
    //var apellido = "";

      if(req.url.indexOf("?") > 0){
        // /?nombre=Francisco => ['/','nombre=Francisco']
        var url_data = req.url.split("?");
        var arreglo_parametros = url_data[1].split("&");
        // [nombre=Francisco,data=algo]
      }

      for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
        var parametro = arreglo_parametros[i];
        //nomre=Francisco
        var param_data = parametro.split("=");
        //[nombre,Francisco]
        parametros[param_data[0]] = param_data[1];
        //{nombre: Francisco}
      }

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
