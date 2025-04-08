
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true
});
let connected = false;
let db;
async function connect() {
  try {
    await client.connect();
    client.on('serverOpening', (event) => {
      console.log("MongoDB server opening:", event);
    });
    connected = true;
    console.log("Successfully connected to MongoDB!");
    db = client.db("DECA_Database")
  }catch(e){
    console.log("Error connecting: " + e)
  }
}
connect()

function getDb(){
    if(!connected){
        return connect().then(()=>{
            return getDb();
        })
    }
    return db;
}
module.exports = {getDb}