import Search from "./components/Search";
import Weather from "./components/Weather";
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import Geocode from "react-geocode";

function App() {

    Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
    Geocode.setRegion("us");

    // const [lat, setLat] = useState(33.7604);
    // const [lng, setLng] = useState(-117.9676);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const coords = useRef({lat, lng});

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((loc) => {
          setLat(loc.coords.latitude);
          setLng(loc.coords.longitude);
          Geocode.fromLatLng(loc.coords.latitude.toString(), loc.coords.longitude.toString()).then(
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

    const [location, setLocation] = useState("");

    const [formattedLoc, setFormattedLoc] = useState("");

    useEffect(() => {
        if (
            coords.current.lat !== lat &&
            coords.current.lng !== lng
        ) {
            console.log(lat, lng);
            coords.current = {lat, lng};
        }
    });

    const getCoords = () => {
        // Geocode.fromAddress(zipCode + ",US").then(
        Geocode.fromAddress(location || 'US').then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setFormattedLoc(response.results[0].formatted_address);
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
                <h2>Enter a location</h2>
                <Search setLocation={setLocation} getCoords={getCoords} />
                <Weather lat={lat} lng={lng} />
                {formattedLoc !== "" &&
                <h3>Address: {formattedLoc}</h3>
                }
            </header>
        </div>
    );
}

export default App;
