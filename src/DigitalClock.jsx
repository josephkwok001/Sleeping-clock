import React, {useState, useEffect} from 'react';

function DigitalClock() {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        const API_KEY = '285559e85a373c634acaf940458f5b8b';
        const city = 'Singapore';
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWeather(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                setLoading(false);
            });
    }, []);

    function formatTime(){
        let hours = time.getHours();
        const minutes = padZero(time.getMinutes());
        const seconds = padZero(time.getSeconds());
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        hours = padZero(hours);

        return `${hours}:${minutes}:${seconds} ${meridiem}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
                
                {loading && <div className="weather">Loading weather...</div>}
                
                {weather && weather.main && (
                    <div className="weather">
                        <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                        <p className="condition">{weather.weather[0].description}</p>
                        <p className="location">{weather.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DigitalClock;
