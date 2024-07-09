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
import React, {useId, useState} from "react";
import {Report, ReportType} from "@nui/src/state/reports.state";
import {useReportModal} from "@nui/src/provider/ReportModalProvider";
import ReportTabsInfo from "@nui/src/components/ReportsModal/Tabs/ReportTabsInfo";
import ReportTabsAction from "@nui/src/components/ReportsModal/Tabs/ReportTabsAction";
import ReportTabsPlayerProximity from "@nui/src/components/ReportsModal/Tabs/ReportTabsPlayerProximity";

const tabsList = [
    {
        label: "Action",
        icon: <FlashOn/>,
        menu: ReportTabsAction
    },
    {
        label: "Info",
        icon: <Article/>,
        menu: ReportTabsInfo
    },
    {
        label: "Players Proximity",
        icon: <Radar/>,
        menu: ReportTabsPlayerProximity
    }
]

// Create Enumeration for Tabs
const tabsLabel = tabsList.map(tab => tab.label)

type TLabelTabs = typeof tabsLabel[number]

let ETabs: { [K in TLabelTabs]: TLabelTabs } = {} as { [K in TLabelTabs]: TLabelTabs }
let enumTabs: { [K in string]: string } = {}

tabsLabel.forEach(tab => enumTabs[tab] = tab)

ETabs = enumTabs as { [K in TLabelTabs]: TLabelTabs }

export default function ReportAdminModal({data}: {data: Report | null}) {
    const reportModal = useReportModal()
    const [tabs, setTabs] = useState<keyof typeof ETabs>(ETabs.Action)

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
                        tabsList.map(tab => (
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
                    {
                        tabsList.map(tab => (<tab.menu tabs={tabs} />))
                    }
                </Box>
            </DialogContent>
        </>
    )
}