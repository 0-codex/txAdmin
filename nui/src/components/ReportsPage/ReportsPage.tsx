import {Box, InputAdornment, MenuItem, styled, TextField, Typography} from "@mui/material";
import React, {ChangeEvent} from "react";
import {useTranslate} from "react-polyglot";
import {Filter, FilterAlt, Search, SearchRounded, SearchSharp} from "@mui/icons-material";
import {ReportDataFilter, ReportType, useReportFilter} from "@nui/src/state/reports.state";
import ReportsList from "@nui/src/components/ReportsPage/ReportsList";

const RootStyled = styled(Box)(({theme}) => ({
    flex: 1,
    backgroundColor: theme.palette.background.default,
    borderRadius: 15,
}))

const TypographyTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
}));

export default function ReportsPage({visible}: {visible: boolean}) {
    const [filterData, setFilterData] = useReportFilter()
    const t = useTranslate()

    const onFilterData = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterData(e.target.value as ReportDataFilter)
    }

    return (
        <RootStyled mt={2} mb={10} pt={4} px={4} display={visible ? "flex" : "none"} flexDirection={"column"} gap={3}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <TypographyTitle variant="h5" color="primary">Reports</TypographyTitle>
                <Box gap={3} display={"flex"}>
                    <TextField
                        label={"Search"}
                        variant={"standard"}
                        style={{
                            minWidth: 150
                        }}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                <Search/>
                            </InputAdornment>
                        )
                    }}/>
                    <TextField
                        label={"Filter By"}
                        variant={"standard"}
                        select
                        style={{
                            minWidth: 150
                        }}
                        onChange={onFilterData}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={"start"}>
                                    <FilterAlt/>
                                </InputAdornment>
                            )
                        }}>
                        <MenuItem value={ReportDataFilter.NoFilter}>No Filter</MenuItem>
                        <MenuItem value={ReportDataFilter.Problem}>Problem</MenuItem>
                        <MenuItem value={ReportDataFilter.Player}>Player</MenuItem>
                        <MenuItem value={ReportDataFilter.Bug}>Bug</MenuItem>
                    </TextField>
                </Box>
            </Box>
            <ReportsList/>
        </RootStyled>
    )
}