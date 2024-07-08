---@type {label: string, type: string, text: string, player: {id: number, name: string}}[]
LOCAL_REPORTLIST = {}

RegisterNetEvent("txcl:rlist:setDetails", function(reportList)
    LOCAL_REPORTLIST = reportList

    sendReactReportList()
end)

RegisterSecureNuiCallback("signalReportPageOpen", function(_, cb)
    TriggerServerEvent("txsv:req:rlist:getDetails")
    cb({})
end)

local function sendReactReportList()
    sendMenuMessage("setReportList", REPORTLIST)
end

-- Dialog for create report
RegisterCommand("txReport", function()
    sendMenuMessage("showReportDialog", {})
end, false)

RegisterSecureNuiCallback("signalReportCreated", function(data, cb)
    print(json.decode(data))
    --TriggerServerEvent("txsv:req:rlist:addReport", data)
    cb({})
end)