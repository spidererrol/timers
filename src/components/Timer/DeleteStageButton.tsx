import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { DeleteIcon } from "@/components/Icons"

export function DeleteStageButton({ updateTimer, timer, stageno }: { updateTimer: updateTimerFunction; timer: TimerData; stageno: number }) {
    if (timer.stages.length <= 1)
        return <FingerButton className="disabled" title="Remove Stage"><DeleteIcon /></FingerButton>
    else
        return <FingerButton title="Remove Stage" onClick={() => { updateTimer(timer.id, t => t.delStage(stageno)) }}><DeleteIcon /></FingerButton>
}
