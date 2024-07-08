import {txAdminMenuPage, usePageValue} from "@nui/src/state/page.state";
import {useEffect} from "react";
import {fetchNui} from "@nui/src/utils/fetchNui";
import {useNuiEvent} from "@nui/src/hooks/useNuiEvent";
import {Report, useReports} from "@nui/src/state/reports.state";
import {EReportModalType, useReportModal} from "@nui/src/provider/ReportModalProvider";

export default function useReportListListener() {
    const currentPage = usePageValue()
    const [reports, setReports] = useReports()

    const reportModal = useReportModal()

    useNuiEvent<Report[]>("setReportList", setReports)
    reportModal && useNuiEvent("showReportDialog", () => {
        reportModal.setData(null)
        reportModal.setTypeModal(EReportModalType.UserDialog)
        reportModal.setShowModal(true)
    })

    useEffect(() => {
        if (currentPage != txAdminMenuPage.Reports) return

        fetchNui("signalReportPageOpen", {}, {mockResp: {}}).catch()

        const updaterInterval = window.setInterval(() => {
            fetchNui("signalReportPageOpen", {}, { mockResp: {} }).catch()
        }, 5000)

        return () => {
            clearInterval(updaterInterval)
        }
    }, []);


}