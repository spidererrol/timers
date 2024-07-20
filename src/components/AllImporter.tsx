import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { CancelIcon, ClipCopyIcon, ClipPasteIcon, DoneIcon } from "@/components/Icons"
import { useState } from "react"
import GenericPage from "./GenericPage"

export function AllImporter({ timers, Show, importTimers }: { timers: TimerData[]; Show: tState, importTimers: (json: string) => void }) {
    const [importText, setImportText] = useState(JSON.stringify(timers))
    return <GenericPage Show={Show} className="Importer" extraButtons={
        <FingerButton onClick={() => { importTimers(importText); Show.toggle() }}><DoneIcon /></FingerButton>
    }>
        <textarea onFocus={e => e.target.select()} onChange={e => setImportText(e.target.value)}>{importText}</textarea>
        {
            navigator.clipboard !== undefined && navigator.clipboard.readText !== undefined
                ? <FingerButton onClick={() => navigator.clipboard.readText().then(s => setImportText(s))}><ClipPasteIcon /></FingerButton>
                : <></>
        }
    </GenericPage>
}
