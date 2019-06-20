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

app.get("/indice",function (req,res) {
  res.render("indice")
});

app.get("/login",function (req,res) {
  res.render("login")
});

app.get("/registrar",function (req,res) {
  res.render("registrar")
});

app.get("/persona",function (req,res){
  
 client.query("select * from persona").then(rows=>{
    client.query("select * from PROFESION").then(profesion=>{
      res.render("persona",{profesiones: profesion,personas:rows})
    })
  })    
});

app.get("/actPersona",function (req,res) {
  res.render("actPersona")
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

app.get("/apreciaciones",function (req,res) {
  client.query("select * from persona").then(rows=>{
    client.query("select * from persona").then(cuadro=>{
        res.render("apreciaciones",{personas: rows,cuadros: cuadro})
    })
  })  
});

app.get("/apreciacion",function (req,res) {
  client.query("select per_cedula,per_nombre,per_apellido from persona").then(rows=>{
      res.render("apreciacion",{personas: rows})
    })
});

app.get("/curriculum",function (req,res) {
  client.query("select * from persona").then(rows=>{
    client.query("select * from persona").then(cuadro=>{
        res.render("curriculum",{personas: rows,cuadros: cuadro})
    })
  })  
});



app.get("/trayectoria",function (req,res) {
  client.query("select * from CARGO").then(cargo=>{  
    client.query("select * from persona").then(rows=>{
        res.render("trayectoria",{personas: rows,cargos: cargo})
    })
  })  
});

app.post("/nav_persona",function (req,res,ret){
  client.query("select * from PROFESION").then(profesion=>{
    res.render("persona",{profesiones: profesion})
  })
});


app.post("/users", function(req,res,ret){
  client.query("select usu_id from usuarios where usu_id='"+req.body.usuario+"'").then(rows=>{
    console.log(rows.rowCount);
    if (req.body.password == req.body.password_confirmation && rows.rowCount<=0 ){
      client.query("insert into USUARIOS values ($1, $2)", [req.body.usuario,req.body.password]);
      console.log("Password: "+ req.body.password);
      console.log("Usuario: "+ req.body.usuario);
      res.render('login');
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
      var consulta = rows.rows[0].usu_contrasena;
      if (consulta == req.body.password){
            console.log("entro1 al query");

        res.render('index');
      }else if (consulta!=req.body.password){
            console.log("entro 22al query");

        res.send("Usuario o Contrasena invalido");
      }
  })
})

app.post("/persona", function(req,res,ret){
  client.query("select pro_id from profesion where pro_profesion='"+req.body.per_profesion+"'").then(profesion=>{  
    client.query("select per_cedula from persona where per_cedula='"+
    req.body.per_cedula+"'").then(rows=>{
      if (rows.rowCount <=0){
        if (req.body.per_nombre2==''){
          var nombre2=null;
        }
        if (req.body.per_apellido2==''){
          var apellido2=null;
        }
        var fecha = req.body.per_fecha_nacimiento.split("/"); 
        var fecha_nac = fecha[2]+'-'+fecha[1]+'-'+fecha[0];
        client.query("insert into PERSONA values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [req.body.per_cedula,req.body.per_nombre,nombre2,req.body.per_apellido,apellido2,fecha_nac,req.body.per_edo_civil,req.body.per_correo,req.body.per_genero,profesion.rows[0].pro_id]); 
        client.query("insert into TELEFONO(tel_cod_area,tel_numero,tel_tipo,tel_persona) values($1,$2,$3,$4)",[req.body.tel_cod_area,req.body.tel_numero,req.body.tel_tipo,req.body.per_cedula])
        client.query("insert into direccion(dir_direccion,dir_persona) values($1,$2)",[req.body.per_direccion,req.body.per_cedula])
        res.send("Persona Fue Agregada");
      } else{
        res.send("Persona Ya Existe");
      }
    })
  })
})

app.post("/capacitacion", function(req,res,ret){
  var fecha = req.body.cap_fecha.split("/"); 
  var fecha_cap = fecha[2]+'-'+fecha[1]+'-'+fecha[0];
  
  if(req.body.cap_persona!=undefined){
    var cedula=req.body.cap_persona.split(" | ",1)
    
    client.query("select ins_id from INSTITUCION where ins_nombre ='"+
      req.body.cap_institucion+"'").then(institucion=>{ 
     client.query("select per_cedula from PERSONA where per_cedula ='"+
      cedula+"'").then(rows=>{
        if(rows.rowCount >0){
          client.query("insert into CAPACITACION values ($1, $2, $3, $4, $5, $6)", [parseInt(cedula),institucion.rows[0].ins_id,req.body.cap_curso,req.body.cap_descripcion,fecha_cap,req.body.cap_horas]); 
          res.send("capacitacion Fue Agregada");
        }else{
          res.send("La persona no existe");
        }
      })
    })  
  }    
})

app.post("/educacion", function(req,res,ret){
 var fecha = req.body.cap_fecha.split("/"); 
 var fecha_cap = fecha[2]+'-'+fecha[1]+'-'+fecha[0]; 

 var fecha2 = req.body.cap_fecha_fin.split("/"); 
 var fecha_cap_fin = fecha2[2]+'-'+fecha2[1]+'-'+fecha2[0];
 if(req.body.cap_persona!=undefined){
    var cedula=req.body.cap_persona.split(" | ",1)

    client.query("select uni_id from UNIVERSIDAD where uni_nombre='"+
      req.body.cap_institucion+"'").then(universidad=>{
     client.query("select per_cedula from PERSONA where per_cedula ='"+
      cedula+"'").then(rows=>{
        if(rows.rowCount >0){
          client.query("insert into EDUCACION(edu_persona,edu_universidad,edu_tipo,edu_carrera,edu_fecha_inicio,edu_fecha_fin) values ($1, $2, $3, $4, $5, $6)", [parseInt(cedula),universidad.rows[0].uni_id,req.body.cap_curso,req.body.cap_descripcion,fecha_cap,fecha_cap_fin]); 
          res.send("Educacion Fue Agregada");
        }else{
          res.send("La persona no existe");
        }
      })
    })
  }    
})


app.post("/infpersona", function(req,res,ret){
  if(req.body.cedula!=undefined){
    var cedula=req.body.cedula.split(" | ",1)  
    client.query("select inf_id from INFORMACION where inf_tipo ='"+
      req.body.inf_per_informacion+"'").then(informacion=>{ 
     client.query("select per_cedula from PERSONA where per_cedula ='"+
      cedula+"'").then(rows=>{
        if(rows.rowCount >0){
          client.query("insert into INFORMACION_PERSONA values ($1, $2, $3)", [parseInt(cedula),informacion.rows[0].inf_id,req.body.inf_per_descripcion]); 
          res.send("Informacion Fue Agregada");
        }else{
          res.send("La persona no existe");
        }
      })
    })
  }    
})

app.post("/apreciacion", function(req,res,ret){
  if(req.body.apr_persona!=undefined){
    var cedula=req.body.apr_persona.split(" | ",1)   
   client.query("select per_cedula from PERSONA where per_cedula ='"+
    cedula+"'").then(rows=>{
      if(rows.rowCount >0){
        client.query("select apr_periodo from APRECIACION where apr_persona='"+
          cedula+"'and apr_periodo='"+req.body.apr_periodo+"'").then(cuenta=>{
            if(cuenta.rowCount<=0){
              client.query("insert into APRECIACION(apr_periodo,apr_solucion_problema,apr_conoce_negocio,apr_habilidad_social,apr_liderazgo,apr_auto_desarrollo,apr_auto_motivacion,apr_consolidado,apr_persona) values($1, $2, $3, $4, $5, $6, $7, $8, $9)",[req.body.apr_periodo,req.body.apr_solucion_problema,req.body.apr_conoce_negocio,req.body.apr_habilidad_social,req.body.apr_liderazgo,req.body.apr_auto_desarrollo,req.body.apr_auto_motivacion,req.body.apr_consolidado,parseInt(cedula)]);
              res.send("Apreciacion Fue Agregada");  
            }else{
              res.send("Esta persona ya fue evaluada en ese periodo");
            }
            
          })
          
      }else{
        res.send("La persona no existe");
      }
    })
  }  
})

app.post("/trayectoria", function(req,res,ret){
 var fecha = req.body.cap_fecha.split("/"); 
 var fecha_cap = fecha[2]+'-'+fecha[1]+'-'+fecha[0]; 

 if(req.body.cap_fecha_fin!=''){
   var fecha2 = req.body.cap_fecha_fin.split("/"); 
   var fecha_cap_fin = fecha2[2]+'-'+fecha2[1]+'-'+fecha2[0];
 }else{
   var fecha_cap_fin =null;
 }
  if(req.body.tra_persona!=undefined){
    var cedula=req.body.tra_persona.split(" | ",1)
    client.query("select car_id from CARGO where car_cargo='"+req.body.tra_cargo+"'").then(cargo=>{
      client.query("insert into TRAYECTORIA(tra_cargo,tra_persona,tra_pmc,tra_tipo_trabajo,tra_empresa,tra_fecha_inicio,tra_fecha_fin) values ($1,$2,$3,$4,$5,$6,$7)",[cargo.rows[0].car_id,parseInt(cedula),req.body.tra_pmc,req.body.tra_tipo_trabajo,req.body.tra_empresa,fecha_cap,fecha_cap_fin])
    res.send("El trabajo fue agregado a la trayectoria sin problemas");
    })
  }
})



app.post("/curriculum",function (req,res,ret) {
  if(req.body.cedula!=undefined){
    var cedula=req.body.cedula.split(" | ",1)
       client.query("select tel_cod_area,tel_numero,tel_tipo from telefono where tel_persona='"+cedula+"'").then(telefono=>{
        client.query("select inf_tipo,inf_per_descripcion from informacion,informacion_persona where inf_per_persona='"+cedula+"' and inf_per_informacion=inf_id").then(informacion=>{
          client.query("select cap_curso,ins_nombre,cap_fecha,cap_horas from capacitacion,institucion where cap_persona='"+cedula+"'and ins_id=cap_institucion").then(capacitacion=>{      
            client.query("select tra_empresa,tra_fecha_inicio,tra_fecha_fin,car_cargo from trayectoria,cargo where car_id=tra_cargo and tra_persona='"+cedula+"'and tra_pmc='NO'").then(trayectoriaEXT=>{      
              client.query("select tra_empresa,tra_fecha_inicio,car_cargo from trayectoria,cargo where car_id=tra_cargo and tra_persona='"+cedula+"'and tra_pmc='SI'").then(trayectoriaPMC=>{  
                
                client.query("select uni_nombre,edu_tipo,edu_carrera,edu_fecha_inicio,edu_fecha_fin from educacion,universidad where edu_persona='"+cedula+"' and edu_universidad=uni_id").then(educacion=>{
                  
                  client.query("select * from persona").then(rows=>{
                    client.query("select per_cedula,per_nombre,per_nombre2,per_apellido,per_apellido2,per_fecha_nacimiento,per_edo_civil,per_correo,pro_profesion,tel_cod_area,tel_numero,tel_tipo from telefono,profesion,persona where per_profesion=pro_id and per_cedula='"+cedula+"' and tel_persona='"+cedula+"'").then(cuadro=>{
                        res.render("curriculum2",{personas: rows,cuadros: cuadro, educaciones: educacion, trayActual: trayectoriaPMC, trayAnterior: trayectoriaEXT, capacitaciones: capacitacion, informaciones: informacion, telefonos: telefono})
                    })
                  })
                })
              })
            })
          })
        })
      })  

  }else{
    client.query("select * from persona").then(rows=>{
      client.query("select * from persona").then(cuadro=>{
          res.render("curriculum",{personas: rows,cuadros: cuadro})
      })
    })
  }

  
});

app.post("/apreciaciones",function (req,res,ret) {
  if(req.body.cedula!=undefined){
    var cedula=req.body.cedula.split(" | ",1)
    client.query("select * from persona").then(cuadro=>{
      client.query("select * from apreciacion where apr_persona='"+cedula+"' order by apr_periodo ASC").then(apreciacion=>{  
        client.query("select per_cedula,per_nombre,per_nombre2,per_apellido,per_apellido2,per_correo,pro_profesion from persona,profesion where pro_id=per_profesion and per_cedula='"+cedula+"'" ).then(persona=>{
          res.render("apreciaciones2",{cuadros:cuadro,personas: persona,apreciaciones:apreciacion})
        })
      })
    })    
  }
})

app.post("/verPersona",function(req,res,ret){
  if(req.body.apr_persona!=undefined){
    var cedula=req.body.apr_persona.split(" | ",1)  
    client.query("select * from persona,profesion,direccion,telefono where per_profesion=pro_id and per_cedula='"+cedula+"' and tel_persona='"+cedula+"'").then(seleccion=>{
      client.query("select * from persona").then(rows=>{
        client.query("select * from PROFESION").then(profesion=>{
         res.render("persona2",{profesiones: profesion,personas:rows,selecciones: seleccion})
        })
      })
    })
  }  
})

app.post("/modificarPersona",function(req,res,ret){
  console.log("Entro a modificarPersona")
  console.log()
  if (req.body.per_nombre2==''){
          var nombre2=null;
  }
  if (req.body.per_apellido2==''){
          var apellido2=null;
  }
  if (req.body.per_nombre2=='null'){
          var nombre2=null;
  }
  if (req.body.per_apellido2=='null'){
          var apellido2=null;
  }
  if (req.body.per_nombre2!='' && req.body.per_nombre2!='null'){
          var nombre2=req.body.per_nombre2;
  }
  if (req.body.per_apellido2!='' && req.body.per_apellido2!='null'){
          var apellido2=req.body.per_apellido2;
  }

  
  var cedula=req.body.per_cedula
  var fecha = req.body.per_fecha_nacimiento.split("/"); 
  var fecha_nac = fecha[2]+'-'+fecha[1]+'-'+fecha[0];
  console.log("entro en modificarPersona")
   client.query("select pro_id from profesion where pro_profesion='"+req.body.pro_profesion+"'").then(per_profesion=>{
    client.query("UPDATE persona SET per_nombre ='"+req.body.per_nombre+"' WHERE per_cedula ='"+cedula+"'")
    client.query("UPDATE persona SET per_nombre2 ='"+nombre2+"' WHERE per_cedula ='"+cedula+"'")
    client.query("UPDATE persona SET per_apellido ='"+req.body.per_apellido+"' WHERE per_cedula ='"+cedula+"'")
    client.query("UPDATE persona SET per_apellido2 ='"+apellido2+"' WHERE per_cedula ='"+cedula+"'")
   
    //per_fecha_nacimiento=#{fecha_nac},per_edo_civil=#{req.body.per_edo_civil},per_correo=#{req.body.per_correo},per_genero=#{req.body.per_genero},per_profesion=#(per_profesion.rows[0].pro_id) WHERE per_cedula=#{cedula}")
    
    res.send("se modifico el usuario")
  })
})

app.listen(8080);
