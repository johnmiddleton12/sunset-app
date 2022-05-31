import React, { useState, useEffect, useRef } from "react";

import WeatherCard from "./WeatherCard";

function Weather({ lat, lng }) {
    const coords = useRef({ lat, lng });

    const [componentArray, setComponentArray] = useState([]);

    useEffect(() => {
        if (coords.current.lat !== lat && coords.current.lng !== lng) {
            console.log(lat, lng);
            console.log("MAKING API CALL");

            const endpoint = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${process.env.REACT_APP_WEATHER_API_KEY}` 

            fetch(endpoint).then(
                function (response) {
                    if (200 !== response.status) {
                        console.log("Problem: " + response.status);
                        return;
                    }

                    response.json().then(function(data) {
                        let tempArr = [];
                        console.log(data);
                        let daily = data.daily;
                        daily.forEach(day => {
                            tempArr.push(
                                <WeatherCard key={day.dt} info={day} />
                            )
                        });
                        setComponentArray(tempArr);
                    })
                }
            )
            coords.current = { lat, lng };
        }
    }, [lat, lng]);

    return (
        <div className="weatherGroup">
            {componentArray}
        </div>
    )

    if (lat !== 0 && lng !== 0) {
        return (
            <div id="weather">
                <h4>Latitude: {lat}</h4>
                <h4>Longitude: {lng}</h4>

            </div>
        );
    } else {
        return <div id="weather"></div>;
    }
}

export default Weather;
