import React from "react"
import "./Timers.css"
import TimerData from "@/objects/TimerData"
import { updateTimerFunction } from "@/libs/helpers"
import { State } from "@/libs/State"
import DropTarget from "@/components/DropTarget"
import TimerRun from "./Timer/Run"
import TimerMin from "./Timer/Min"
import Timer from "./Timer"

interface TimersProps {
    timers: TimerData[]
    copyTimer: (id: number) => void
    delTimer: (id: number) => void
    updateTimer: updateTimerFunction
    dragging: State<number | undefined>
    mode: "Normal" | "Min"
}

export default function Timers({ timers, copyTimer, delTimer, updateTimer, dragging, mode }: TimersProps) {
    const TimerComp = (mode == "Normal" ? Timer : TimerMin)
    const prefix = (mode == "Normal" ? "drop" : "min")
    const render_timers = []
    for (let i = 0; i < timers.length; i++) {
        const timer = timers[i]
        render_timers.push(<DropTarget key={prefix + i} prefix={prefix} position={i} dragging={dragging.state !== undefined} />)
        render_timers.push(<TimerComp key={i} timer={timer} copyTimer={() => copyTimer(i)} delTimer={delTimer} updateTimer={updateTimer} dragging={dragging.state !== undefined /*&& dragging.state != timer.id*/} />)
    }
    render_timers.push(<DropTarget key={prefix + timers.length} prefix={prefix} position={timers.length} dragging={dragging.state !== undefined} />)

    return <>{render_timers}</>
}
