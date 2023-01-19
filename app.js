const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "7f20482ae3d8494c8a6102008230301";
  const url = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + query;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.current.temp_c;
      const weatherDescription = weatherData.current.condition.text;
      const iconUrl = weatherData.current.condition.icon;

      res.write("<p1>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + "is " + temp + " degrees Celsius</h1>");
      res.write("<img src=" + iconUrl + ">");

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
