import Timer from "@/components/Timer"
import React from "react"
import "./Timers.css"
import TimerData from "@/objects/TimerData"
import { updateTimerFunction } from "@/libs/helpers"

export default function Timers({ timers, delTimer, updateTimer }: { timers: TimerData[], delTimer: (id: number) => void, updateTimer: updateTimerFunction }) {
    const render_timers = []
    for (const timer of timers) {
        render_timers.push(<Timer timer={timer} delTimer={delTimer} updateTimer={updateTimer} />)
    }
    return render_timers
}
