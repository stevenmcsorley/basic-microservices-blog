// axios.post('http://localhost:4001/events', event).catch((err) => {
//     console.log(err.message);
//   });
// https://nodejs.medium.com/node-js-v15-0-0-is-here-deb00750f278
// Unhandled Promise Rejections

// app.listen(4002, async () => {
//   console.log("Listening on 4002");
//   try {
//     const res = await axios.get("http://localhost:4005/events");
 
//     for (let event of res.data) {
//       console.log("Processing event:", event.type);
 
//       handleEvent(event.type, event.data);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// });

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());


const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-c-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get('/events', (req, res) =>{
  res.send(events)
})

app.listen(4005, () => {
  console.log("Listening on 4005");
});
