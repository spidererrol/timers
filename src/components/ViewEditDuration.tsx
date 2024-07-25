import { tState } from "@/libs/State"
import { timerduration } from "@/objects/TimerData"
import { DurationSetter } from "@/components/DurationSetter"

interface ViewEditDurationProps {
    duration: timerduration
    updateDuration: (update: (d: timerduration) => void) => void
    edit: tState
    useSeconds: tState
}

export function ViewEditDuration({ duration, updateDuration, edit, useSeconds }: ViewEditDurationProps) {
    return <>{edit.state
        ? <DurationSetter duration={duration} updateDuration={updateDuration} useSeconds={useSeconds} />
        : <span onClick={() => edit.toggle()}>{duration.toDisplay()}</span>}
    </>
}
