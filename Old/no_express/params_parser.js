function parse(req){
  var arreglo_parametros = [], parametros = {};

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

  return parametros;
}

module.exports.parse = parse;