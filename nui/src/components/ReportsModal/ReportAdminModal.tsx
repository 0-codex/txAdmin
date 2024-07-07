import {Box, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {BugReport, Close, DirectionsWalk, QuestionMark, ReportProblem} from "@mui/icons-material";
import React from "react";
import {Report, ReportType} from "@nui/src/state/reports.state";
import {useReportModal} from "@nui/src/provider/ReportModalProvider";

export default function ReportAdminModal({data}: {data: Report | null}) {
    const reportModal = useReportModal()

    const closeHandler = () => {
        reportModal?.setShowModal(false)
        reportModal?.setData(null)
    }

    const typeIcon: { [Type in ReportType]: React.ReactElement } = {
        bug: <BugReport/>,
        player: <DirectionsWalk/>,
        problem: <ReportProblem/>,
        other: <QuestionMark/>
    }

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <DialogTitle sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <Box sx={(theme) => ({
                        color: theme.palette.primary.main
                    })}>{data && typeIcon[data.type]}</Box>
                    {data?.label}
                </DialogTitle>
                <IconButton onClick={closeHandler}><Close/></IconButton>
            </Box>
            <DialogContent>
                <Typography>{data?.type}</Typography>
            </DialogContent>
        </>
    )
}