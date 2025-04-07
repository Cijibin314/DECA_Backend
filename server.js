const express = require('express');
const cors = require('cors');
require('dotenv').config()
const Calendar = require('./google/calendar')
const {isValidUser, removeUser, addUser} = require('./database/users.js');
const app = express();

app.use(cors());
app.use(express.json())

app.post('/api/validateUser', function(req, res) {
  try{
    if(isValidUser(req.body.username, req.body.password)){
      res.status(200).send(JSON.stringify({"valid": true}));
    }else{
      res.status(200).send(JSON.stringify({"valid": false}));
    }
  }catch(e){
    console.log("Error validating user: " + e)
    res.status(500).send("An error occurred")
  }
})
app.put('/api/addUser', function(req, res){
  if(req.body.auth === process.env.ADMIN_PASSWORD){
    try{
      addUser(req.body.username, req.body.password);
      res.status(200)
    }catch(e){
      console.log("Error adding user: " + e)
      res.status(500).send("An error occurred")
    }
  }else{
    res.status(401).send("Invalid authentication")
  }
})
app.delete('/api/removeUser', function(req, res){
  if(req.body.auth === process.env.ADMIN_PASSWORD){
    try{
      removeUser(req.body.username, req.body.password);
      res.status(200)
    }catch(e){
      console.log("Error removing user: " + e)
      res.status(500).send("An error occurred")
    }
  }else{
    res.status(401).send("Invalid authentication")
  }
})
app.get('/api/periodic', function(req, res) {
  res.status(200)
  res.send("Success");
  console.log("CronJob suceeded")
})

app.get('/api/calendar', async function(req, res) {
  try{
    res.status(200).send(await Calendar.listEvents());
  }catch(e){
    res.status(500).send("An error occurred")
    console.log("Error getting claendar:" + e)
  }
})

app.listen(3000, function() {
  console.log('Server started');
});
