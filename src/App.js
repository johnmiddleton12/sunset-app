import Search from "./components/Search";
import Weather from "./components/Weather";
import React, { useState, useRef } from "react";
import "./App.css";

import Geocode from "react-geocode";

function App() {
    Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
    Geocode.setRegion("us");

    const [zipCode, setZipCode] = useState("");

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const coords = useRef({lat, lng});

    const getCoords = () => {
      // TODO: get users location and get country code from that,
      // or add option to just use current location
        Geocode.fromAddress(zipCode + ",US").then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <h2>Enter your zip code</h2>
                <Search setZipCode={setZipCode} getCoords={getCoords} />
                <Weather coords={coords} lat={lat} lng={lng} />
            </header>
        </div>
    );
}

export default App;
