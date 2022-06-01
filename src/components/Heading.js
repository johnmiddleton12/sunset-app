import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

export default function Heading () {
    return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                <Typography variant="h2">Enter a location</Typography>
            </Box>
    )
}