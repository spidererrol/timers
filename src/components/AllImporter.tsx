import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "./FingerButton"
import { CancelIcon, ClipCopyIcon, ClipPasteIcon, DoneIcon } from "./Icons"
import { useState } from "react"

export function AllImporter({ timers, Show, importTimers }: { timers: TimerData[]; Show: tState, importTimers: (json: string) => void }) {
    const [importText, setImportText] = useState(JSON.stringify(timers))
    return <div className="Importer">
        <textarea onFocus={e=>e.target.select()} onChange={e => setImportText(e.target.value)}>{importText}</textarea>
        {
            navigator.clipboard !== undefined && navigator.clipboard.readText !== undefined
                ? <FingerButton onClick={() => navigator.clipboard.readText().then(s => setImportText(s))}><ClipPasteIcon /></FingerButton>
                : <></>
        }
        <FingerButton onClick={() => { importTimers(importText); Show.toggle() }}><DoneIcon /></FingerButton>
        <FingerButton onClick={() => Show.toggle()}><CancelIcon /></FingerButton>
    </div>
}