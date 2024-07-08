import {Box, styled, Typography} from "@mui/material";
import {Report, ReportType, useFilterReportData, useReports} from "@nui/src/state/reports.state";
import {useNuiEvent} from "@nui/src/hooks/useNuiEvent";
import React from "react";
import {BugReport, DirectionsWalk, QuestionMark, ReportProblem} from "@mui/icons-material";
import {EReportModalType, useReportModal} from "@nui/src/provider/ReportModalProvider";

const CardBox = styled(Box)(({theme}) => ({
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    height: "fit-content",
    padding: 20,
    minWidth: 200,
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.action.selected
    }
}))

export default function ReportsList() {
    const filterData = useFilterReportData()

    const reportModal = useReportModal()

    const typeIcon: { [Type in ReportType]: React.ReactElement } = {
        bug: <BugReport/>,
        player: <DirectionsWalk/>,
        problem: <ReportProblem/>,
        other: <QuestionMark/>
    }

    const clickHandler = (report: Report) => {
        reportModal?.setData(report)
        reportModal?.setTypeModal(EReportModalType.UserDialog) // For test
        reportModal?.setShowModal(true)
    }

    return (
        <Box display={"flex"} flex={1} flexWrap={"wrap"} gap={2}>
            {
                filterData.map(report => (
                    <CardBox onClick={() => clickHandler(report)}>
                        <Box display={"flex"} gap={1}>
                            <Box color={(theme) => theme.palette.primary.main}>{typeIcon[report.type]}</Box>
                            <Typography
                                style={{ marginLeft: 5 }}
                                variant="subtitle1"
                                color="textPrimary"
                            >{report.label}</Typography>
                        </Box>
                        <Typography
                            style={{ marginLeft: 5 }}
                            noWrap
                            variant="subtitle1"
                            color="textPrimary"
                        >{report.player.id} | {report.player.name}</Typography>
                    </CardBox>
                ))
            }
        </Box>
    )
}