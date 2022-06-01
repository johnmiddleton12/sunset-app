import { Box, Container } from "@mui/system";

export default function Help ({ formattedLoc }) {
    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                {formattedLoc !== "" && (
                    <h4>Currently Viewing: {formattedLoc}</h4>
                )}
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                <p>
                    AQI is air quality index, 1-5 - 1 is best.
                    <br />
                    Clouds is a percentage, 30%-70% is best.
                    <br />
                    Humidity is a percentage, lower percentages are best.
                    <br />
                    Calm winds are usually best, but wind direction changes near
                    sunset times are good.
                </p>
            </Box>
        </Container>
    )
}