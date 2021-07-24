// console.log("hello");
const msg1 = document.getElementById("temp");
const msg2 = document.getElementById("feelsLike");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  document.querySelector("input").value.textContent = "";
  e.preventDefault();
  msg2.textContent = "";
  msg1.textContent = "";

  const location = document.querySelector("input").value;
  fetchWeather(location);
});
const fetchWeather = function (location) {
  msg1.textContent = "........Loading";
  msg2.textContent = "";
  const url = `/weather?search=${location}`;
  fetch(url)
    .then((res) => {
      res.json().then((response) => {
        if (response.error) msg1.textContent = response.error;
        else {
          msg1.textContent = "Today's weather is " + response.forecast + "°C";
          msg2.textContent = "It feels Like " + response.feelsLike + "°C";
        }
      });
    })
    .catch((err) => console.log("error"));
};
