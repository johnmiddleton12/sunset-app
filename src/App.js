import Search from "./components/Search";
import Weather from "./components/Weather";
import React, { useState, useEffect } from "react";
import "./App.css";

import Geocode from "react-geocode";

function App() {
    Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
    // Geocode.setRegion("us");

    // const [lat, setLat] = useState(33.7604);
    // const [lng, setLng] = useState(-117.9676);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [location, setLocation] = useState("");
    const [formattedLoc, setFormattedLoc] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((loc) => {
                setLat(loc.coords.latitude);
                setLng(loc.coords.longitude);
                Geocode.fromLatLng(
                    loc.coords.latitude.toString(),
                    loc.coords.longitude.toString()
                ).then(
                    (response) => {
                        setFormattedLoc(response.results[0].formatted_address);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            });
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h2>Enter a location</h2>
                <Search
                    location={location}
                    setLocation={setLocation}
                    setLat={setLat}
                    setLng={setLng}
                    setFormattedLoc={setFormattedLoc}
                />
                <h3>Help</h3>
                <p>AQI is air quality index, 1-5 - 1 is best.<br />
                Clouds is a percentage, 30%-70% is best.<br />
                Humidity is a percentage, lower percentages are best.<br />
                Calm winds are usually best, but wind direction changes near sunset times are good.
                </p>

                <Weather lat={lat} lng={lng} />
                {formattedLoc !== "" && (
                    <h3>Currently Viewing: {formattedLoc}</h3>
                )}
            </header>
        </div>
    );
}

export default App;
