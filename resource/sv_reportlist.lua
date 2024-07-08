---@type {label: string, type: string, text: string, player: {id: number, name: string}}[]
REPORTLIST = {}

RegisterNetEvent("txsv:req:rlist:getDetails", function()
    TriggerClientEvent("txcl:rlist:setDetails", source, REPORTLIST)
end)

RegisterNetEvent("txsv:req:rlist:addReport", function(report)
    table.insert(REPORTLIST, report)
end)