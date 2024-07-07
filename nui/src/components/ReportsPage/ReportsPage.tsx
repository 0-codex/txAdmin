import {Box, InputAdornment, MenuItem, styled, Typography} from "@mui/material";
import React, {ChangeEvent, useEffect} from "react";
import {useTranslate} from "react-polyglot";
import {Filter, FilterAlt, Search, SearchRounded, SearchSharp} from "@mui/icons-material";
import {TextField} from "../misc/TextField"
import {
    ReportDataFilter,
    useReportFilterSearch,
    useReportFilterType
} from "@nui/src/state/reports.state";
import ReportsList from "@nui/src/components/ReportsPage/ReportsList";
import {useDebounce} from "@nui/src/hooks/useDebouce";

const RootStyled = styled(Box)(({theme}) => ({
    flex: 1,
    backgroundColor: theme.palette.background.default,
    borderRadius: 15,
}))

const TypographyTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
}));

export default function ReportsPage({visible}: {visible: boolean}) {
    const [filterTypeData, setFilterTypeData] = useReportFilterType()
    const [filterSearchData, setFilterSearchData] = useReportFilterSearch()

    const t = useTranslate()

    const onFilterTypeData = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterTypeData(e.target.value as ReportDataFilter)
    }

    const onFilterSearchData = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterSearchData(e.target.value)
    }

    return (
        <RootStyled mt={2} mb={10} pt={4} px={4} display={visible ? "flex" : "none"} flexDirection={"column"} gap={3}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <TypographyTitle variant="h5" color="primary">Reports</TypographyTitle>
                <Box gap={3} display={"flex"}>
                    <TextField
                        label={"Search"}
                        variant={"standard"}
                        onChange={onFilterSearchData}
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
                        defaultValue={filterTypeData}
                        style={{
                            minWidth: 150
                        }}
                        onChange={onFilterTypeData}
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