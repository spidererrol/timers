import { tState } from "@/libs/State"
import { timerduration } from "@/objects/TimerData"
import { DurationSetterHMS } from "@/components/DurationSetter"

export function ViewEditDuration({ duration, updateDuration, edit }: { duration: timerduration; updateDuration: (update: (d: timerduration) => void) => void; edit: tState} ) {
    return <>{edit.state
        ? <DurationSetterHMS duration={duration} updateDuration={updateDuration} />
        : <span onClick={() => edit.toggle()}>{duration.toDisplay()}</span>}
    </>
}
