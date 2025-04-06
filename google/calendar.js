const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const { google } = require("googleapis");
const {auth} = require("./oAuth.js")

// Create a calendar instance
const calendar = google.calendar({ version: "v3", auth });
async function listEvents() {
    try {
      const response = await calendar.events.list({
        calendarId: process.env.CALENDAR_ID, // Use your calendar ID
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
  
      const events = response.data.items.map(event => ({
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
      }));
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
    }
}

module.exports = { listEvents };