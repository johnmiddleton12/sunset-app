import React, { useEffect } from "react";

function Weather({ coords, lat, lng }) {

    useEffect(() => {
        if (
            coords.current.lat !== lat &&
            coords.current.lng !== lng
        ) {
            console.log(lat, lng);
            coords.current = {lat, lng};
        }
    })

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

export default Weather;