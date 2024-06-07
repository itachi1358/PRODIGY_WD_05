let search_box_content = document.querySelector('.search-container');
let container=document.querySelector('.container');
let search_icon=document.querySelector('.search-icon');
let stats=document.querySelector('.stats');
let city= document.getElementById('search-container');  
let image=document.querySelector('.image-container');
let city_name=city.value;
var latitude,longitutde;
const get_coordinates = async (city_name) =>{
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city_name}`;
    try{
    const response= await fetch(url);
    const data= await response.json();
    latitude=data[0].lat;
    longitutde=data[0].lon
    return{
        arr : [latitude,longitutde]
    }
    }
    catch(Error){
        stats.innerHTML = `Error fetching the weather data.`;
        return { arr: [-1, -1] };
    } 

}
checkwhether = async (latitude,longitutde) => {
    const api_key='db9fe40de614af29793907a6013f3d20';
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitutde}&appid=${api_key}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    stats.innerHTML = `
                        ( ${city.value} )
                <h2>Weather in ${weatherData.name}</h2>
                <p>Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
                <p>Humidity: ${weatherData.main.humidity}%</p>
                <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            `;
}
const increase= ()=>{
    container.classList.add('increase');
    setTimeout(function(){
        stats.classList.remove('hide');
        image.classList.remove('hide');
    },600);
    // stats.innerHTML=` <h2> ${city_name.value} </h2>`;
}
search_icon.addEventListener('click',async function(){
    const c= await get_coordinates(city.value);
    if(c.arr[0]===-1 || c.arr[1]===-1){
        stats.innerHTML=`
        <h1>Error</h1>`
    }
    else{
    await checkwhether(c.arr[0],c.arr[1]);
    }
}

);   
search_box_content.addEventListener('keydown',async (event) => {
    if(event.key==='Enter'){
        increase();
        const c= await get_coordinates(city.value);
        if(c.arr[0]===-1 || c.arr[1]===-1){
            stats.innerHTML=`Error in fetching the weather data.
            The Location Might Not Exist, 
            `
        }
        else{
        await checkwhether(c.arr[0],c.arr[1]);
        }
    }
});