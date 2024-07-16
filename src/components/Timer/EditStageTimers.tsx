import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ColourWheelIcon, DeleteIcon } from "@/components/Icons"
import { DurationSetter } from "@/components/DurationSetter"
import { useState } from "react"
import { tState } from "@/libs/State"

export default function EditStageTimers({ timer, stageno, updateTimer, ColoursMode }: { timer: TimerData; stageno: number; updateTimer: updateTimerFunction,ColoursMode:tState }) {
    const stage = timer.stages[stageno]
    return (
        <div className="editstage">
            <div className="timerstage">{stageno + 1}</div>
            <DurationSetter duration={stage.duration} updateDuration={ud => updateTimer(timer.id, t => { ud(t.stages[stageno].duration) })} />
            <div className="controls">
                <FingerButton title="Colours" onClick={() => ColoursMode.toggle()}><ColourWheelIcon /></FingerButton>
                <div className="flexpadding">&nbsp;</div>
                <FingerButton title="Remove Stage" onClick={() => { updateTimer(timer.id, t => t.delStage(stageno)) }}><DeleteIcon /></FingerButton>
            </div>
        </div>
    )
}
