import Search from "./components/Search";
import Weather from "./components/Weather";
import Help from './components/Help';
import Heading from './components/Heading';
import React, { useState, useEffect } from "react";
import "./App.css";

import Geocode from "react-geocode";
import { Box, Container } from "@mui/system";

function App() {
    Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
    // Geocode.setRegion("us");

    // const [lat, setLat] = useState(34.0195);
    // const [lng, setLng] = useState(118.4912);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [location, setLocation] = useState("");
    const [formattedLoc, setFormattedLoc] = useState("");
    const [loaded, setLoaded] = useState(false);

    const currentLocation = () => {
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
    };

    useEffect(() => {
        currentLocation();
    }, []);

    return (
        <Container className="App-header">

            <Heading />

            <Search
                location={location}
                setLocation={setLocation}
                setLat={setLat}
                setLng={setLng}
                setFormattedLoc={setFormattedLoc}
                currentLocation={currentLocation}
                loaded={loaded}
            />

            <Help formattedLoc={formattedLoc} />

            <Weather lat={lat} lng={lng} setLoaded={setLoaded} />
        </Container>
    );
}

export default App;
