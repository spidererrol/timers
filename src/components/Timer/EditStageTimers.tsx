import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ClockIcon, ColourWheelIcon, SecondsIcon } from "@/components/Icons"
import { DurationSetter } from "@/components/DurationSetter"
import { useState } from "react"
import { tState } from "@/libs/State"
import { DeleteStageButton } from "./DeleteStageButton"

export default function EditStageTimers({ timer, stageno, updateTimer, ColoursMode }: { timer: TimerData; stageno: number; updateTimer: updateTimerFunction, ColoursMode: tState }) {
    const stage = timer.stages[stageno]
    const SecondsMode = new tState(useState(false))
    return (
        <div className="editstage">
            <div className="timerstage">{stageno + 1}</div>
            <DurationSetter useSeconds={SecondsMode} duration={stage.duration} updateDuration={ud => updateTimer(timer.id, t => { ud(t.stages[stageno].duration) })} />
            <div className="controls">
                <FingerButton title="Colours" onClick={() => { ColoursMode.toggle(); stage.sortColours() }}><ColourWheelIcon /></FingerButton>
                {SecondsMode.state
                    ? <FingerButton title="H:M:S" onClick={() => SecondsMode.toggle()}><ClockIcon duration={stage.duration} /></FingerButton>
                    : <FingerButton title="Seconds" onClick={() => SecondsMode.toggle()}><SecondsIcon duration={stage.duration} /></FingerButton>
                }
                <DeleteStageButton updateTimer={updateTimer} timer={timer} stageno={stageno} />
            </div>
        </div>
    )
}


