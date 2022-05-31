import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function WeatherCard({ info, airInfo }) {

    // let rating = 0;

    let clouds = info.clouds;
    let aqi = airInfo.main.aqi;
    let humidity = info.humidity;
    let wind_speed = info.wind_speed;

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
        <Card sx={{ minWidth: 275 }}>

        <CardContent>

        <Typography sx={{ fontSize: 14}}>{day}</Typography>
        <Typography>Sunset: {sunset_hours}:{sunset_minutes.substr(-2)} PM</Typography>
        <Typography>Clouds: {clouds}%</Typography>
        <Typography>AQI: {aqi}</Typography>
        <Typography>Humidity: {humidity}%</Typography>
        <Typography>Wind Speed: {wind_speed} mph</Typography>
        <Typography>Wind Direction: {wind_direction}</Typography>

        </CardContent>

        </Card>
    )

}