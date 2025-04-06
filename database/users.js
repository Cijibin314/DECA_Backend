const {getDb} = require('./connection.js')
let connection = null;
async function getConnection(){
    if(!connection){
        connection = await getDb().then((db)=>{return db.collection("Users")})
    }
}
async function addUser(username, password){
    await getConnection();
    const doc = {"username": username, "password": password};
    connection.insertOne(doc)
}
async function isValidUser(username, password){
    await getConnection();
    const result = await connection.findOne({"username": username, "password": password})
    return result != null;
}
async function removeUser(username, password){
    await getConnection();
    connection.deleteOne({"username": username, "password": password})
}

module.exports = {isValidUser, removeUser, addUser}