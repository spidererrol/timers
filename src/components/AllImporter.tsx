import { State, tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ClipPasteIcon, DoneIcon } from "@/components/Icons"
import { ChangeEvent, useState } from "react"
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
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImportText("Please wait, loading...")
            const upload = e.target.files[0]
            upload.text().then(s => setImportText(s))
        }
    }
    return <GenericPage Show={Show} title="Importer" extraButtons={
        <FingerButton onClick={() => { importTimers(importText, replace.state); Show.toggle() }}><DoneIcon /></FingerButton>
    }>
        <Checkbox label="Replace current?" checked={replace} />
        <textarea onFocus={e => e.target.select()} onChange={e => setImportText(e.target.value)} value={importText} />
        <input type="file" onChange={handleFileChange} />
        {
            navigator.clipboard !== undefined && navigator.clipboard.readText !== undefined
                ? <FingerButton onClick={() => navigator.clipboard.readText().then(s => setImportText(s))}><ClipPasteIcon /></FingerButton>
                : <></>
        }
    </GenericPage>
}
