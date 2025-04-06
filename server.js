const express = require('express');
const Calendar = require('./google/calendar')
const app = express();

app.use(express.static('public'));

app.post('/api/validateUser', function(req, res) {

})

app.get('/api/calendar', async function(req, res) {
  try{
    res.send(await Calendar.listEvents());
  }catch(e){
    console.log("Error getting claendar:" + e)
  }
})

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
