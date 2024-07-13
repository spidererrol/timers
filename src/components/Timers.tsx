import Timer from "@/components/Timer"
import React from "react"
import "./Timers.css"
import TimerData from "@/objects/TimerData"

export default function Timers({ timers,delTimer }: { timers: TimerData[],delTimer:(id:number)=>void }) {
    const render_timers = []
    for (const timer of timers) {
        render_timers.push(<Timer timer={timer} delTimer={delTimer} />)
    }
    return render_timers
}
