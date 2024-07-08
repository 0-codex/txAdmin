import {txAdminMenuPage, usePageValue} from "@nui/src/state/page.state";
import {useEffect} from "react";
import {fetchNui} from "@nui/src/utils/fetchNui";
import {useNuiEvent} from "@nui/src/hooks/useNuiEvent";
import {Report, useReports} from "@nui/src/state/reports.state";

export default function useReportListListener() {
    const currentPage = usePageValue()
    const [reports, setReports] = useReports()

    useNuiEvent<Report[]>("setReportList", setReports)

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