import {atom, selector, useRecoilState, useRecoilValue} from "recoil";

export enum ReportType {
    Other,
    Problem,
    Player,
    Bug
}

interface Report {
    id: number,
    label: string,
    type: ReportType
}

export enum ReportDataFilter {
    NoFilter = "noFilter",
    Problem = "problem",
    Player = "player",
    Bug = "bug"
}

const reportsState = {
    reportData: atom<Report[]>({
        default: [],
        key: "reportsData"
    }),
    reportFilterType: atom<ReportDataFilter | null>({
        default: ReportDataFilter.NoFilter,
        key: "reportFilterType"
    }),
    filterReportData: selector({
        key: "filterReportData",
        get: ({get}) => {
            const filterType = get(reportsState.reportFilterType) ?? ReportType.Other
            const reports = get(reportsState.reportData)

            reports.filter((report) => report.type == filterType)
        }
    })
}

export const useReports = () => useRecoilState(reportsState.reportData)
export const useReportFilter = () => useRecoilState(reportsState.reportFilterType)
export const useFilterReportData = () => useRecoilValue(reportsState.filterReportData)