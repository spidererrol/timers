import { timerduration } from "@/objects/TimerData"
import NumberScroller from "@/components/NumberScroller"
import { tState } from "@/libs/State"

export function DurationSetterSeconds({ duration, updateDuration }: { duration: timerduration; updateDuration: (update: (d: timerduration) => void) => void }) {
    return <div className="timeset seconds">
        <NumberScroller min={0} max={24 * 60 * 60} value={duration.full_seconds}
            updateValue={n => updateDuration(d => d.full_seconds = n)}
            digits={6}
        />
    </div>
}

export function DurationSetterHMS({ duration, updateDuration }: { duration: timerduration; updateDuration: (update: (d: timerduration) => void) => void }) {
    return <div className="timeset hms">
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

export function DurationSetter({ duration, updateDuration, useSeconds }: { duration: timerduration; useSeconds: tState, updateDuration: (update: (d: timerduration) => void) => void }) {
    if (useSeconds.state) {
        return <DurationSetterSeconds duration={duration} updateDuration={updateDuration} />
    } else {
        return <DurationSetterHMS duration={duration} updateDuration={updateDuration} />
    }
}