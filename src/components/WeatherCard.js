import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia, Grid } from "@mui/material";

const sunsetImg = require("../sunset.jpg");

export default function WeatherCard({ info, airInfo, today }) {

    let clouds = info.clouds;
    let aqi = airInfo.main.aqi;
    let humidity = info.humidity;
    let wind_speed = info.wind_speed;

    let cloud_rating =
        100 - Math.min(Math.abs(30 - clouds), Math.abs(70 - clouds));
    let aqi_rating = aqi * 20;
    let humidity_rating = 100 - humidity;
    let wind_speed_rating = 100 - wind_speed / 10;
    let rating =
        cloud_rating * 0.5 +
        aqi_rating * 0.2 +
        humidity_rating * 0.2 +
        wind_speed_rating * 0.1;
    rating = Math.round(rating * 100) / 100;

    var sunset = new Date(info.sunset);
    let sunset_time = sunset.toLocaleString('en-US').split(" ")[1].slice(0, -3);

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = weekday[sunset.getDay()];
    day = today ? day + " (Today)" : day;

    let angle = parseInt(info.wind_deg);
    const arrows = {
        north: "↑ N",
        north_east: "↗ NE",
        east: "→ E",
        south_east: "↘ SE",
        south: "↓ S",
        south_west: "↙ SW",
        west: "← W",
        north_west: "↖ NW",
    };
    let wind_direction = arrows["north"];
    const directions = Object.keys(arrows);
    const degree = 360 / directions.length;
    angle = angle + degree / 2;
    for (let i = 0; i < directions.length; i++) {
        if (angle >= i * degree && angle < (i + 1) * degree) {
            wind_direction = arrows[directions[i]];
        }
    }

    return (
        <Grid item>
            <Card 
                sx={{ minWidth: 275 }}
                variant={today ? "outlined" : "elevation"}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={String(sunsetImg)}
                    alt="sunset"
                    sx={{
                        filter: `brightness(${rating}%)`,
                    }}
                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }}>{day}</Typography>
                    <Typography>
                        Sunset: {sunset_time} PM
                    </Typography>
                    <Typography>Rating: {rating}%</Typography>
                    <Typography>Clouds: {clouds}%</Typography>
                    <Typography>AQI: {aqi}</Typography>
                    <Typography>Humidity: {humidity}%</Typography>
                    <Typography>Wind Speed: {wind_speed} mph</Typography>
                    <Typography>Wind Direction: {wind_direction}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
