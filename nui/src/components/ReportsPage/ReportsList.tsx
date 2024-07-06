import {Box} from "@mui/material";
import {useReportFilter} from "@nui/src/state/reports.state";

export default function ReportsList() {
    const [filterData, setFilterData] = useReportFilter()

    return (
        <Box display={"flex"} flex={1} flexWrap={"wrap"}>
            <Box>
                <h1>test</h1>
            </Box>
        </Box>
    )
}