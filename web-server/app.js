const express = require("express");
const app = express();
const hbs = require("hbs");
const request = require("request");

const getWeather = function (city, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=d22b3fcd47c57627984eb86f942e9458&query=" +
    city;
  request({ url: url, json: true }, (err, response) => {
    if (err) callback("unable to found", undefined, undefined);
    else if (response.body.error)
      callback("Unable to find", undefined, undefined);
    //console.log(response);
    else {
      const data = response.body;
      let temp = data.current.temperature;
      let feelsLike = data.current.feelslike;
      callback(undefined, temp, feelsLike);
    }
  });
};

//app.com/help
//app.com/about
//app.com/
app.set("view engine", "hbs");
const path = __dirname + "/views/partials";
hbs.registerPartials(path);
app.use(express.static(__dirname + "/public"));
app.get("", (req, res) => {
  // res.sendFile(__dirname + `/public/index.html`);
  res.render("index");
});
app.get("/help", (req, res) => {
  //res.sendFile(__dirname + "/public/help.html");
  res.render("help");
});

app.get("/about", (req, res) => {
  //res.sendFile(__dirname + `/public/about.html`);
  res.render("about", { title: "about me", name: "mukul" });
});
app.get("/weather", (req, res) => {
  if (!req.query.search) res.send({ error: "Unable to search" });
  else {
    getWeather(req.query.search, (err, temp, feelsLike) => {
      if (err) res.send({ error: "unable to find location" });
      else {
        res.send({
          forecast: temp,
          feelsLike: feelsLike,
        });
      }
    });
    //res.send("hi");
  }
});
const port=process.env.PORT||3000;
app.get("*", (req, res) => res.render("404"));
app.listen(port, () => console.log("server started"));
