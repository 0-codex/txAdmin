import {Box, Typography} from "@mui/material";
import React from "react";

export default function ReportTabsInfo({visible}: {visible: boolean}) {
    return (
        <Box sx={{
            display: visible ? "initial" : "none"
        }}>
            <Typography variant="h6">Information</Typography>
        </Box>
    )
}