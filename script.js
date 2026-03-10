const getbtn = document.querySelector("#getbtn");

const main = document.querySelector("#main");
const weather = document.querySelector("#weather");

const dataDiv = document.querySelector("#data");

const SearchBtn = document.getElementById("SearchBtn");
const cityInput = document.getElementById("cityInput");

const leftbtn = document.querySelector("#leftbtn");

const API_KEY = "a49957df0cdb483c94d130052260403";


getbtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported.");
    }

    navigator.geolocation.getCurrentPosition(success, error);

    main.style.display = "none";
    weather.style.display = "block";

});

async function success(position) {
    try {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
        );

        const data = await response.json();

        displayWeather(data);

    } catch (err) {
        console.error("Error:", err);
    }
}

function error(err) {
    alert("Location permission denied.");
    console.log(err);
}


function displayWeather(data) {
    dataDiv.style.display = "block";
    dataDiv.innerHTML = `
        <h1>Location: ${data.location.name}, ${data.location.region} - ${data.location.country}</h1>
        <h2>Temperature: ${data.current.temp_c}°C</h2>
        <div id="imgdiv"><img src="${data.current.condition.icon}" alt=""></div>
        <h3>Forecast: ${data.current.condition.text}</h3>
    `;
};




async function getData() {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=a49957df0cdb483c94d130052260403&q=${cityInput.value}&aqi=no`);

    return await promise.json();
}

SearchBtn.addEventListener("click", async function () {
    const value = cityInput.value;
    const result = await getData(value);
    dataDiv.innerHTML = `
        <h1>Location: ${result.location.name}, ${result.location.region} - ${result.location.country}</h1>
        <h2>Temperature: ${result.current.temp_c}°C</h2>
        <div id="imgdiv"><img src="${result.current.condition.icon}" alt=""></div>
        <h3>Forecast: ${result.current.condition.text}</h3>
    `;
});


leftbtn.addEventListener("click",()=>{
    window.location.reload();
})