import React, {createContext, ReactElement, ReactNode, useContext, useState} from "react";
import {Report, ReportType} from "@nui/src/state/reports.state";
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import ReportAdminModal from "@nui/src/components/ReportsModal/ReportAdminModal";
import ReportUserModal from "@nui/src/components/ReportsModal/ReportUserModal";

export enum EReportModalType {
    AdminDialog,
    UserDialog
}

interface IReportModalContext {
    setData: (report: Report | null) => void,
    data: Report | null,
    setShowModal: (state: boolean) => void,
    showModal: boolean,
    setTypeModal: (type: EReportModalType) => void,
    typeModal: EReportModalType
}

const ReportModalContext = createContext<IReportModalContext | null>(null)

export const useReportModal = () => useContext(ReportModalContext)

export default function ReportModalProvider({children}: {children: ReactNode}) {
    const [data, setData] = useState<Report | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [typeModal, setTypeModal] = useState<EReportModalType>(EReportModalType.UserDialog)

    return (
        <ReportModalContext.Provider value={{
            setData: setData,
            data: data,
            setShowModal: setShowModal,
            showModal: showModal,
            setTypeModal: setTypeModal,
            typeModal: typeModal
        }}>
            <Dialog open={showModal} sx={{
                borderRadius: 15
            }}>
                {
                    typeModal == EReportModalType.AdminDialog ? <ReportAdminModal data={data}/> : <ReportUserModal data={data}/>
                }
            </Dialog>
            <Box>
                {children}
            </Box>
        </ReportModalContext.Provider>
    )
}