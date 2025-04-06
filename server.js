const express = require('express');
const cors = require('cors');
const Calendar = require('./google/calendar')
const {isValidUser, removeUser, addUser} = require('./database/users.js');
const app = express();

app.use(cors());

app.post('/api/validateUser', function(req, res) {

})
app.get('/api/periodic', function(req, res) {
  res.status(200)
  res.send("Success");
  console.log("CronJob suceeded")
})

app.get('/api/calendar', async function(req, res) {
  try{
    res.send(await Calendar.listEvents());
  }catch(e){
    console.log("Error getting claendar:" + e)
  }
})

app.listen(3000, function() {
  console.log('Server started');
});
