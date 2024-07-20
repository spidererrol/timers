import { updateTimerFunction } from "@/libs/helpers"
import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import { useState } from "react"
import EditColours from "@/components/Timer/EditColours"
import EditStageTimers from "@/components/Timer/EditStageTimers"

export default function EditStage({ timer, stageno, updateTimer }: { timer: TimerData; stageno: number; updateTimer: updateTimerFunction} ) {
    const ColoursMode = new tState(useState(false))
    if (ColoursMode.state)
        return <EditColours timer={timer} stageno={stageno} updateTimer={updateTimer} ColoursMode={ColoursMode} />
    return <EditStageTimers timer={timer} stageno={stageno} updateTimer={updateTimer} ColoursMode={ColoursMode} />
}
