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
module.exports.client = client;