import { TextField, Grid } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Geocode from "react-geocode";

import React, { useState } from "react";

function Search({ blockedLocation, currentLocation, setLat, setLng, setFormattedLoc, loaded }) {

    const [location, setLocation] = useState("");

    const inputChangeHandler = (e) => {
        setLocation(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getCoords();
        }
    };

    const getCoords = () => {
        // Geocode.fromAddress(zipCode + ",US").then(
        Geocode.fromAddress(location || "US").then(
            (response) => {
                // console.log('coordinating')
                const { lat, lng } = response.results[0].geometry.location;
                setFormattedLoc(response.results[0].formatted_address);
                setLat(lat);
                setLng(lng);
            },
            (error) => {
                if (error.message.includes("ZERO_RESULTS")) {
                    alert('Invalid Location!');
                } else {
                    console.error(error);
                }
            }
        );
    };

    return (
        <Grid 
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        paddingTop="25px"
        >
            <Grid item xs={12}>
            <TextField
                id="outlined-basic"
                onChange={inputChangeHandler}
                onKeyPress={handleKeyPress}
                label="Location"
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <LoadingButton onClick={getCoords} loading={!loaded} variant="outlined">Submit</LoadingButton>
            </Grid>
            <Grid item xs={12}>
            <LoadingButton disabled={blockedLocation} onClick={currentLocation} loading={!loaded} variant="outlined">Current Location</LoadingButton>
            </Grid>
        </Grid>
    )
}

export default Search;