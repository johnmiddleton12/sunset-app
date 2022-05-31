# Sunset Helper

This project shows the forecast for the week, predicting how good the sunsets will be based on weather factors.

## Usage

On load, the app tries to use the user's current location, and if that fails defaults to Santa Monica. You can enter in any location to look at the sunset prediction there.

## API Usage

The Google Maps Javascript API was used, specifically the [Geocoding Service](https://developers.google.com/maps/documentation/javascript/geocoding).

The Open Weather Map [One Call API](https://openweathermap.org/api/one-call-3) and [Air Pollution API](https://openweathermap.org/api/air-pollution) were used for the weather forecasts.

### Todo

- [ ] Use a CSS Framework to stylize
- [ ] Make a formula to standardize a sunset rating, e.g., 0 - 100
- [ ] Make a database to store data and location ranges that were accessed to reduce API calls