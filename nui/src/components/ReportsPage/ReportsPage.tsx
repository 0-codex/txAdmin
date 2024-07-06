import {Box, styled, Typography} from "@mui/material";
import React from "react";
import {useTranslate} from "react-polyglot";

const RootStyled = styled(Box)(({theme}) => ({
    flex: 1,
    backgroundColor: theme.palette.background.default,
    borderRadius: 15,
}))

const TypographyTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
}));

export default function ReportsPage({visible}: {visible: boolean}) {
    const t = useTranslate()

    return (
        <RootStyled mt={2} mb={10} pt={4} px={4} display={visible ? "initial" : "none"}>
            <TypographyTitle variant="h5" color="primary">Reports</TypographyTitle>
        </RootStyled>
    )
}