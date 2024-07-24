import { useMemo, useState } from "react"
import { Object_tStates, State, tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import GenericPage from "@/components/GenericPage"
import { Export } from "@/components/Export"
import { Checkbox } from "@/components/Checkbox"
import { importExportData, TimersSavesCollection } from "@/objects/DataTypes"
import { loadData } from "@/libs/dataStorage"

export function AllExporter({ timers, Show }: { timers: TimerData[]; Show: tState }) {
    const exportAllCurrent = new tState(useState(true))
    const exportSaved = new tState(useState(false))
    const eso: { [key: number]: boolean } = { 1: false }
    for (const timer of timers) {
        eso[timer.id] = false
    }
    const exportSelection = new Object_tStates<{ [key: number]: boolean }>(useState(eso))
    const exportText = useMemo(
        () => {
            const exportObject: importExportData = {}
            if (exportAllCurrent.state)
                exportObject["timers"] = timers
            else {
                const tmrs: TimerData[] = []
                for (const skey in exportSelection.state) {
                    const key = Number.parseInt(skey)
                    if (exportSelection.state[key])
                        tmrs.push(timers.find(t => t.id == key) as TimerData)
                }
                if (tmrs.length > 0)
                    exportObject["timers"] = tmrs
            }
            if (exportSaved.state)
                exportObject["saves"] = loadData<TimersSavesCollection>("savedTimers", {})
            return JSON.stringify(exportObject)
        },
        [timers, exportAllCurrent.state, exportSaved.state, exportSelection.state]
    )
    const sufprefix = exportAllCurrent.state && exportSaved.state ? "full" : exportAllCurrent.state ? "timers" : exportSaved.state ? "saves" : "selected"
    return <GenericPage title="Exporter" Show={Show}>
        <div className="options">
            <Checkbox label="All Current Timers?" checked={exportAllCurrent} />
            <Checkbox label="Saved Timers?" checked={exportSaved} />
            {
                exportAllCurrent.state
                    ? <></>
                    : timers.map(t => <Checkbox key={t.id} label={t.name} checked={exportSelection.tState(t.id)} />)
            }
        </div>
        <Export exportText={exportText} fileprefix={"void-" + sufprefix} />
    </GenericPage>
}
