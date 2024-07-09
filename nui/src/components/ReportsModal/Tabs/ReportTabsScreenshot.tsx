import {Box, Typography} from "@mui/material";
import React from "react";

export default function ReportTabsScreenshot({visible}: {visible: boolean}) {
    return (
        <Box sx={{
            display: visible ? "initial" : "none"
        }}>
            <Typography variant="h6">Player Proximity</Typography>
        </Box>
    )
}