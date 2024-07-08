import {
    Box,
    DialogContent,
    DialogTitle,
    IconButton, List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {
    Article,
    BugReport,
    Close, Details,
    DirectionsWalk,
    FlashOn,
    HealthAndSafety,
    QuestionMark, Radar,
    ReportProblem
} from "@mui/icons-material";
import React from "react";
import {Report, ReportType} from "@nui/src/state/reports.state";
import {useReportModal} from "@nui/src/provider/ReportModalProvider";

const tabs: {
    label: string,
    icon: React.ReactNode,
    menu: React.ReactNode
}[] = [
    {
        label: "Action",
        icon: <FlashOn/>,
        menu: <Box></Box>
    },
    {
        label: "Info",
        icon: <Article/>,
        menu: <Box></Box>
    },
    {
        label: "Players Proximity",
        icon: <Radar/>,
        menu: <Box></Box>
    }
]

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
            <DialogContent sx={{
                display: "flex"
            }}>
                <List>
                    {
                        tabs.map(tab => (
                            <ListItemButton key={tab.label.toLowerCase().replace(" ", "_")} sx={{
                                borderRadius: 2
                            }}>
                                <ListItemIcon>{tab.icon}</ListItemIcon>
                                <ListItemText>{tab.label}</ListItemText>
                            </ListItemButton>
                        ))
                    }
                </List>
                <Box sx={{
                    flex: 1
                }}>

                </Box>
            </DialogContent>
        </>
    )
}