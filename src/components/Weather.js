import React, { useState, useEffect, useRef } from "react";

import WeatherCard from "./WeatherCard";

function Weather({ lat, lng }) {
    const coords = useRef({ lat, lng });

    const [componentArray, setComponentArray] = useState([]);

    useEffect(() => {
        if (coords.current.lat !== lat && coords.current.lng !== lng) {
            // console.log(lat, lng);
            console.log("MAKING API CALLS");

            const endpoint = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;

            const airEndpoint = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

            Promise.all([fetch(endpoint), fetch(airEndpoint)])
                .then(([response, airResponse]) => {
                    // console.log(response, airResponse);

                    if (200 !== response.status && 200 !== airResponse.status) {
                        console.log("Problem: " + response.status);
                        return;
                    }

                    Promise.all([response.json(), airResponse.json()]).then(
                        ([data, airData]) => {
                            // console.log(data);
                            let tempArr = [];
                            let daily = data.daily;
                            let airDaily = airData.list;
                            // console.log(airDaily);
                            for (let i = 0; i < 8; i++) {
                                let day = daily[i];
                                tempArr.push(
                                    <WeatherCard
                                        key={day.dt}
                                        info={day}
                                        airInfo={airDaily[i]}
                                    />
                                );
                            }
                            setComponentArray(tempArr);
                        }
                    );
                })
                .catch((err) => {
                    console.log(err);
                });

            coords.current = { lat, lng };
        }
    }, [lat, lng]);

    return <div className="weatherGroup">{componentArray}</div>;
}

export default Weather;
