const {getDb} = require('./connection.js')
let connection = null;
async function getConnection(){
    if(!connection){
        connection = await getDb().then((db)=>{return db.collection("Data")})
    }
}

async function addData(data){
    await getConnection()
    console.log("Data added")
}
async function retrieveOptions(data){
    await getConnection()
    return "options"
}

module.exports = {addData, retrieveOptions}