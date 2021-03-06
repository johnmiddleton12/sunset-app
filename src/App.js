import Search from "./components/Search";
import Weather from "./components/Weather";
import Help from "./components/Help";
import Heading from "./components/Heading";
import React, { useState, useEffect } from "react";
import "./App.css";

import Geocode from "react-geocode";
import { Container } from "@mui/system";

import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
    Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
    // Geocode.setRegion("us");

    // const [lat, setLat] = useState(34.0195);
    // const [lng, setLng] = useState(118.4912);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [formattedLoc, setFormattedLoc] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [blockedLocation, setBlockedLocation] = useState(false);

    let theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    theme = createTheme(theme, {
        typography: {
            h2: {
                color: theme.palette.text.primary,
                fontSize: "2.5em",
                paddingTop: "25px",
            },
            h4: {
                color: theme.palette.text.primary,
                fontSize: "1.5em",
                paddingTop: "25px",
            },
            p: {
                color: theme.palette.text.primary,
                fontSize: "1em",
                paddingTop: "25px",
            },
        },
    });

    const currentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (loc) => {
                    setBlockedLocation(false);
                    setLat(loc.coords.latitude);
                    setLng(loc.coords.longitude);
                    Geocode.fromLatLng(
                        loc.coords.latitude.toString(),
                        loc.coords.longitude.toString()
                    ).then(
                        (response) => {
                            setFormattedLoc(
                                response.results[0].formatted_address
                            );
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                },
                () => {
                    setBlockedLocation(true);
                    setLat(34.4208305);
                    setLng(-119.6981901);
                    setFormattedLoc("Santa Monica, CA, USA");
                }
            );
        } else {
            setLat(34.4208305);
            setLng(-119.6981901);
            setFormattedLoc("Santa Monica, CA, USA");
        }
    };

    if ("permissions" in navigator) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (notificationPerm) {
                notificationPerm.onchange = function () {
                    if (notificationPerm.state === "granted") {
                        setBlockedLocation(false);
                    } else {
                        setBlockedLocation(true);
                    }
                };
            });
    }

    useEffect(() => {
        currentLocation();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container
                className="App-header"
                sx={{
                    // backgroundColor: theme.palette.background.paper
                    backgroundColor: "#a40606",
                    backgroundImage:
                        "linear-gradient(315deg, #a40606 0%, #d98324 74%)",
                }}
            >
                <Heading />

                <Search
                    setLat={setLat}
                    setLng={setLng}
                    setFormattedLoc={setFormattedLoc}
                    currentLocation={currentLocation}
                    loaded={loaded}
                    blockedLocation={blockedLocation}
                />

                <Help formattedLoc={formattedLoc} />

                <Weather lat={lat} lng={lng} setLoaded={setLoaded} />
            </Container>
        </ThemeProvider>
    );
}

export default App;
