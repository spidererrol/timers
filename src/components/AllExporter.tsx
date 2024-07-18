import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "./FingerButton"
import { ClipCopyIcon, DoneIcon } from "./Icons"

export function AllExporter({ timers, Show }: { timers: TimerData[]; Show: tState }) {
    const exportText = JSON.stringify(timers)
    return <div className="Exporter">
        <textarea onFocus={e=>e.target.select()}>{exportText}</textarea>
        {
            navigator.clipboard !== undefined && navigator.clipboard.writeText !== undefined
                ? <FingerButton onClick={() => navigator.clipboard.writeText(exportText)}><ClipCopyIcon /></FingerButton>
                : <></>
        }
        <FingerButton onClick={() => Show.toggle()}><DoneIcon /></FingerButton>
    </div>
}