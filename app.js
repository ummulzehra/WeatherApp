const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "7ff190aa52811b58c505ad23ccf78084"
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

  https.get(url, function(response){
    console.log(response.statuscode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon =  weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
      res.write("<p>The temperature in " + query +" is " + temp + " degree Celcius.<p>");
      res.write("<img src=" + imageURL +">");
      res.send();
    })
  })

})




app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
