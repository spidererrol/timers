import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ClipCopyIcon, DoneIcon } from "@/components/Icons"
import GenericPage from "./GenericPage"

export function AllExporter({ timers, Show }: { timers: TimerData[]; Show: tState }) {
    const exportText = JSON.stringify(timers)
    return <GenericPage title="Exporter" Show={Show}>
        <textarea onFocus={e => e.target.select()}>{exportText}</textarea>
        {
            navigator.clipboard !== undefined && navigator.clipboard.writeText !== undefined
                ? <FingerButton onClick={() => navigator.clipboard.writeText(exportText)}><ClipCopyIcon /></FingerButton>
                : <></>
        }
    </GenericPage>
}
