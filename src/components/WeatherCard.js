export default function WeatherCard({ info, airInfo }) {

    var sunset = new Date(info.sunset * 1000);
    let sunset_hours = sunset.getHours() - 12;
    let sunset_minutes = "0" + sunset.getMinutes();

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[sunset.getDay()];

    let angle = parseInt(info.wind_deg);
    const arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
    let wind_direction = arrows['north'];
    const directions = Object.keys(arrows);
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
        if (angle >= (i * degree) && angle < (i + 1) * degree) {
            wind_direction = arrows[directions[i]];
        }
    }

    return (
        <div>

        <h4 className="weather-card">{day}</h4>
        <h5>Sunset: {sunset_hours}:{sunset_minutes.substr(-2)} PM</h5>
        <h5>Clouds: {info.clouds}%</h5>
        <h5>AQI: {airInfo.main.aqi}</h5>
        <h5>Humidity: {info.humidity}%</h5>
        <h5>Wind Speed: {info.wind_speed} mph</h5>
        <h5>Wind Direction: {wind_direction}</h5>

        </div>
    )

}