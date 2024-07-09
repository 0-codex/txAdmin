import {Box, Typography} from "@mui/material";
import React from "react";

export default function ReportTabsAction({visible}: {visible: boolean}) {
    return (
        <Box sx={{
            display: visible ? "initial" : "none",
            background: ""
        }}>
            <Typography variant="h6">Action</Typography>
        </Box>
    )
}