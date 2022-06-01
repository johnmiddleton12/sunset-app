import Geocode from "react-geocode";

export default function currentLocation() {
    let lat = 0;
    let lng = 0;
    let formatted = "";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((loc) => {
            lat = loc.coords.latitude;
            lng = loc.coords.longitude;
            Geocode.fromLatLng(
                loc.coords.latitude.toString(),
                loc.coords.longitude.toString()
            ).then(
                (response) => {
                    formatted = response.results[0].formatted_address;
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    }

    return [lat, lng, formatted];
}
