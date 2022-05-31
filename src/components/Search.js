import Geocode from "react-geocode";

function Search({ location, setLocation, setLat, setLng, setFormattedLoc }) {

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
                console.log('coordinating')
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
        <div id="search">
            <input
                id="main"
                onChange={inputChangeHandler}
                onKeyPress={handleKeyPress}
                label="Search"
                type="text"
            />
            <button
                onClick={getCoords}
            >
                Submit
            </button>
        </div>
    )
}

export default Search;