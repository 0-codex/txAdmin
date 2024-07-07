import {createContext, ReactElement, ReactNode, useContext, useState} from "react";
import {Report} from "@nui/src/state/reports.state";
import {Box} from "@mui/material";

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

    return (
        <ReportModalContext.Provider value={{
            setData: setData,
            data: data,
            setShowModal: setShowModal,
            showModal: showModal
        }}>
            <Box display={showModal ? "flex" : "none"} bgcolor={"red"}>
                <h1>Test</h1>
            </Box>
            {children}
        </ReportModalContext.Provider>
    )
}