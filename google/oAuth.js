require('dotenv').config()
const {google} = require('googleapis')

console.log(__dirname.substring(0, __dirname.length-"/google".length) + "/service-account.json")
const auth = new google.auth.GoogleAuth({
    keyFile: __dirname.substring(0, __dirname.length-"/google".length) + "/service-account.json",
    scopes: ["https://www.googleapis.com/auth/calendar"],
});

module.exports = {auth}