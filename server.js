const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '23e9bf8f21318da59cc9f8af0d5ea0c0';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      let wind = JSON.parse(body)
      let value = JSON.parse(body)
      
      //let tempV = JSON.parse(body)

      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let weatherValue = `${weather.main.temp}`;
        let windText= `Wind ${wind.wind.speed} m/s from ${wind.wind.deg}`;
        //console.log(tempValue); 
        console.log(weatherText);
        console.log(windText);
        res.render('index', {weather: weatherText, value: weatherValue, wind: windText, error: null});
        //res.render('index', {tempV: tempValue, error: null});

      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})