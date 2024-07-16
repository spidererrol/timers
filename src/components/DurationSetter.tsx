import { timerduration } from "@/objects/TimerData"
import NumberScroller from "./NumberScroller"

export function DurationSetter({ duration, updateDuration }: { duration: timerduration; updateDuration: (update: (d: timerduration) => void) => void} ) {
    return <div className="timeset">
        <NumberScroller min={0} max={24} value={duration.hours}
            updateValue={n => updateDuration(d => d.hours = n)} />
        <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
        <NumberScroller min={0} max={59} value={duration.minutes}
            updateValue={n => updateDuration(d => d.minutes = n)} />
        <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
        <NumberScroller min={0} max={59} value={duration.seconds}
            updateValue={n => updateDuration(d => d.seconds = n)} />
    </div>
}
