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
  client.query("select * from PROFESION").then(profesion=>{
    res.render("persona",{profesiones: profesion})
  })
});

app.get("/capacitacion",function (req,res) {
  client.query("select * from INSTITUCION").then(institucion=>{      
    client.query("select per_cedula,per_nombre,per_apellido from persona").then(rows=>{
      res.render("capacitacion",{personas: rows,instituciones: institucion})
    })
  })
});

app.get("/infpersona",function (req,res) {
  client.query("select inf_id,inf_tipo from INFORMACION").then(informacion=>{      
    client.query("select per_cedula,per_nombre,per_apellido from persona").then(rows=>{
      res.render("infpersona",{personas: rows,informaciones: informacion})
    })
  })
});

app.get("/educacion",function (req,res) {
  client.query("select * from UNIVERSIDAD").then(universidad=>{      
    client.query("select per_cedula,per_nombre,per_apellido from persona").then(rows=>{
      res.render("educacion",{personas: rows,universidades: universidad})
    })
  })
});

app.get("/apreciacion",function (req,res) {
  client.query("select per_cedula,per_nombre,per_apellido from persona").then(rows=>{
      res.render("apreciacion",{personas: rows})
    })
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
  //console.log("entro al post");
  client.query("select usu_contrasena from usuarios where usu_id ='"+
  req.body.usuario+"'").then(rows=>{
    //console.log("entro al query");
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
      client.query("insert into TELEFONO(tel_cod_area,tel_numero,tel_tipo,tel_persona) values($1,$2,$3,$4)",[req.body.tel_cod_area,req.body.tel_numero,req.body.tel_tipo,req.body.per_cedula])
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

app.post("/educacion", function(req,res,ret){
 client.query("select per_cedula from PERSONA where per_cedula ='"+
  req.body.cap_persona+"'").then(rows=>{
    if(rows.rowCount >0){
      client.query("insert into EDUCACION(edu_persona,edu_universidad,edu_tipo,edu_carrera,edu_fecha_inicio,edu_fecha_fin) values ($1, $2, $3, $4, $5, $6)", [req.body.cap_persona,req.body.cap_institucion,req.body.cap_curso,req.body.cap_descripcion,req.body.cap_fecha,req.body.cap_fecha_fin]); 
      res.send("Educacion Fue Agregada");
    }else{
      res.send("La persona no existe");
    }
  })
})


app.post("/infpersona", function(req,res,ret){
console.log(req.body.cedula)
console.log(req.body.informacion)
 client.query("select per_cedula from PERSONA where per_cedula ='"+
  req.body.cedula+"'").then(rows=>{
    if(rows.rowCount >0){
      client.query("insert into INFORMACION_PERSONA values ($1, $2, $3)", [req.body.cedula,req.body.informacion,req.body.inf_per_descripcion]); 
      res.send("Informacion Fue Agregada");
    }else{
      res.send("La persona no existe");
    }
  })
})

app.post("/apreciacion", function(req,res,ret){
 client.query("select per_cedula from PERSONA where per_cedula ='"+
  req.body.apr_persona+"'").then(rows=>{
    if(rows.rowCount >0){
      client.query("select apr_periodo from APRECIACION where apr_persona='"+
        req.body.apr_persona+"'and apr_periodo='"+req.body.apr_periodo+"'").then(cuenta=>{
          if(cuenta.rowCount<=0){
            client.query("insert into APRECIACION(apr_periodo,apr_solucion_problema,apr_conoce_negocio,apr_habilidad_social,apr_liderazgo,apr_auto_desarrollo,apr_auto_motivacion,apr_consolidado,apr_persona) values($1, $2, $3, $4, $5, $6, $7, $8, $9)",[req.body.apr_periodo,req.body.apr_solucion_problema,req.body.apr_conoce_negocio,req.body.apr_habilidad_social,req.body.apr_liderazgo,req.body.apr_auto_desarrollo,req.body.apr_auto_motivacion,req.body.apr_consolidado,req.body.apr_persona]);
            res.send("Apreciacion Fue Agregada");  
          }else{
            res.send("Esta persona ya fue evaluada en ese periodo");
          }
          
        })
        
    }else{
      res.send("La persona no existe");
    }
  })
})



app.listen(8080);
