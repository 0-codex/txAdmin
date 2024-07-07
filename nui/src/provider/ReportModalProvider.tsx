import React, {createContext, ReactElement, ReactNode, useContext, useState} from "react";
import {Report, ReportType} from "@nui/src/state/reports.state";
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {BugReport, Close, DirectionsWalk, QuestionMark, ReportProblem} from "@mui/icons-material";

interface IReportModalContext {
    setData: (report: Report | null) => void,
    data: Report | null,
    setShowModal: (state: boolean) => void,
    showModal: boolean
}

const ReportModalContext = createContext<IReportModalContext | null>(null)

export const useReportModal = () => useContext(ReportModalContext)

export default function ReportModalProvider({children}: {children: ReactNode}) {
    const [data, setData] = useState<Report | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    const closeHandler = () => {
        setShowModal(false)
        setData(null)
    }

    const typeIcon: { [Type in ReportType]: React.ReactElement } = {
        bug: <BugReport/>,
        player: <DirectionsWalk/>,
        problem: <ReportProblem/>,
        other: <QuestionMark/>
    }

    return (
        <ReportModalContext.Provider value={{
            setData: setData,
            data: data,
            setShowModal: setShowModal,
            showModal: showModal
        }}>
            <Dialog open={showModal} sx={{
                borderRadius: 15
            }}>
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
            </Dialog>
            <Box>
                {children}
            </Box>
        </ReportModalContext.Provider>
    )
}