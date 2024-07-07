import {atom, selector, useRecoilState, useRecoilValue} from "recoil";
import {debugData} from "@nui/src/utils/debugData";

export enum ReportType {
    Other = "other",
    Problem = "problem",
    Player = "player",
    Bug = "bug"
}

export interface Report {
    label: string,
    type: ReportType,
    player: {
        id: number,
        name: string
    }
}

export enum ReportDataFilter {
    NoFilter = "noFilter",
    Problem = "problem",
    Player = "player",
    Bug = "bug",
    Other = "other"
}

const reportsState = {
    reportData: atom<Report[]>({
        default: [],
        key: "reportsData"
    }),
    reportFilterType: atom<ReportDataFilter>({
        default: ReportDataFilter.NoFilter,
        key: "reportFilterType"
    }),
    reportFilterSearch: atom<string>({
        default: "",
        key: "reportFilterSearch"
    }),
    filterReportData: selector({
        key: "filterReportData",
        get: ({get}): Report[] => {
            const filterType = get(reportsState.reportFilterType)
            const filterSearch = get(reportsState.reportFilterSearch)

            const reports = get(reportsState.reportData)

            let filterData: Report[] = reports

            switch (filterType){
                case ReportDataFilter.Bug:
                    filterData = filterData.filter((report) => report.type == ReportType.Bug)
                    break
                case ReportDataFilter.Other:
                    filterData = filterData.filter((report) => report.type == ReportType.Other)
                    break
                case ReportDataFilter.Player:
                    filterData = filterData.filter((report) => report.type == ReportType.Player)
                    break
                case ReportDataFilter.Problem:
                    filterData = filterData.filter((report) => report.type == ReportType.Problem)
                    break
                case ReportDataFilter.NoFilter:
                    break
                default:
                    break
            }

            filterSearch != "" && (filterData = filterData.filter((report) => report.label.toLowerCase().includes(filterSearch.toLowerCase())))

            return filterData
        }
    })
}

export const useReports = () => useRecoilState(reportsState.reportData)
export const useReportFilterType = () => useRecoilState(reportsState.reportFilterType)
export const useReportFilterSearch = () => useRecoilState(reportsState.reportFilterSearch)
export const useFilterReportData = () => useRecoilValue(reportsState.filterReportData)

debugData<Report[]>([
    {
        action: "setReportList",
        data: [
            {
                type: ReportType.Player,
                label: "Free Kill",
                player: {
                    id: 1,
                    name: "Mxrveuh"
                }
            },
            {
                type: ReportType.Bug,
                label: "Free Kill",
                player: {
                    id: 1,
                    name: "Mxrveuh"
                }
            },
            {
                type: ReportType.Problem,
                label: "Free Kill",
                player: {
                    id: 1,
                    name: "Mxrveuh"
                }
            },
            {
                type: ReportType.Other,
                label: "Free Kill",
                player: {
                    id: 1,
                    name: "Mxrveuh"
                }
            }
        ]
    }
])