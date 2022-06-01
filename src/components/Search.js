import { TextField, Grid } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Geocode from "react-geocode";

function Search({ location, currentLocation, setLocation, setLat, setLng, setFormattedLoc, loaded }) {

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
        >
            <Grid item xs={8}>
            <TextField
                id="outlined-basic"
                onChange={inputChangeHandler}
                onKeyPress={handleKeyPress}
                label="Location"
                variant="outlined"
            />
            </Grid>
            <Grid item xs={0}>
            <LoadingButton onClick={getCoords} loading={!loaded} variant="outlined">Submit</LoadingButton>
            </Grid>
            <Grid item xs={12}>
            <LoadingButton onClick={currentLocation} loading={!loaded} variant="outlined">Current Location</LoadingButton>
            </Grid>
        </Grid>
    )
}

export default Search;