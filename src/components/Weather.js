function Weather({ lat, lng }) {

    if (lat !== 0 && lng !== 0) {
    return (
        <div id="weather">

            <h3>
                Latitude: {lat}
            </h3>
            <h3>
                Longitude: {lng}
            </h3>
        </div>
    )
    }
    else{
        return(
            <div id="weather">
                
            </div>
        )
    }

}

export default Weather;