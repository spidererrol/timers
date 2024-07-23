import { useMemo, useState } from "react"
import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import GenericPage from "@/components/GenericPage"
import { Export } from "@/components/Export"
import { Checkbox } from "@/components/Checkbox"
import { importExportData, TimersSavesCollection } from "@/objects/DataTypes"
import { loadData } from "@/libs/dataStorage"

export function AllExporter({ timers, Show }: { timers: TimerData[]; Show: tState }) {
    const exportAllCurrent = new tState(useState(true))
    const exportSaved = new tState(useState(false))
    //TODO: Allow to individually export timers (show list of timers when exportAllCurrent is false). Not sure if allow a selection or just one.
    const exportText = useMemo(
        () => {
            const exportObject: importExportData = {}
            if (exportAllCurrent.state)
                exportObject["timers"] = timers
            if (exportSaved.state)
                exportObject["saves"] = loadData<TimersSavesCollection>("savedTimers", {})
            return JSON.stringify(exportObject)
        },
        [timers, exportAllCurrent.state, exportSaved.state]
    )
    const sufprefix = exportAllCurrent.state && exportSaved.state ? "full" : exportAllCurrent.state ? "timers" : exportSaved.state ? "saves" : "blank"
    return <GenericPage title="Exporter" Show={Show}>
        <div className="options">
            <Checkbox label="All Current Timers?" checked={exportAllCurrent} />
            <Checkbox label="Saved Timers?" checked={exportSaved} />
        </div>
        <Export exportText={exportText} fileprefix={"void-" + sufprefix} />
    </GenericPage>
}
