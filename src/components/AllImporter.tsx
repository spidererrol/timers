import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ClipPasteIcon, DoneIcon } from "@/components/Icons"
import { useState } from "react"
import GenericPage from "@/components/GenericPage"
import { importTimersFunc } from "@/objects/DataTypes"
import { Checkbox } from "./Checkbox"

interface AllImporterProps {
    timers: TimerData[]
    Show: tState
    importTimers: importTimersFunc
}

export function AllImporter({ timers, Show, importTimers }: AllImporterProps) {
    const [importText, setImportText] = useState(JSON.stringify({ timers }))
    const replace = new tState(useState(true))
    return <GenericPage Show={Show} title="Importer" extraButtons={
        <FingerButton onClick={() => { importTimers(importText, replace.state); Show.toggle() }}><DoneIcon /></FingerButton>
    }>
        <Checkbox label="Replace current?" checked={replace} />
        <textarea onFocus={e => e.target.select()} onChange={e => setImportText(e.target.value)} value={importText} />
        {
            navigator.clipboard !== undefined && navigator.clipboard.readText !== undefined
                ? <FingerButton onClick={() => navigator.clipboard.readText().then(s => setImportText(s))}><ClipPasteIcon /></FingerButton>
                : <></>
        }
    </GenericPage>
}
