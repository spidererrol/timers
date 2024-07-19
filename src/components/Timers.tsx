import Timer from "@/components/Timer"
import React, { useState } from "react"
import "./Timers.css"
import TimerData from "@/objects/TimerData"
import { updateTimerFunction } from "@/libs/helpers"
import { DndContext, DragCancelEvent, DragEndEvent, DragStartEvent, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { State, tState } from "@/libs/State"
import DropTarget from "./DropTarget"

export default function Timers({ timers, copyTimer, delTimer, moveTimer, updateTimer }: { timers: TimerData[], copyTimer: (id: number) => void, delTimer: (id: number) => void, moveTimer: (from: number, to: number) => void, updateTimer: updateTimerFunction }) {
    // const dragging = new tState(useState(false))
    const dragging = new State(useState<number | undefined>(undefined))
    // const debug = new State(useState(""))
    const myPointerSensor = useSensor(PointerSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    const sensors = useSensors(myPointerSensor)
    const render_timers = []
    for (let i = 0; i < timers.length; i++) {
        const timer = timers[i]
        render_timers.push(<DropTarget key={"drop" + i} position={i} dragging={dragging.state !== undefined} />)
        render_timers.push(<Timer key={i} timer={timer} copyTimer={()=>copyTimer(i)} delTimer={delTimer} updateTimer={updateTimer} dragging={dragging.state !== undefined && dragging.state != timer.id} />)
    }
    render_timers.push(<DropTarget key={"drop" + timers.length} position={timers.length} dragging={dragging.state !== undefined} />)

    function dragStart(event: DragStartEvent) {
        dragging.state = Number.parseInt(event.active.id.toString().replace("timer:", ""))
    }

    function dragEnd(event: DragEndEvent) {
        dragging.state = undefined
        // debug.state = JSON.stringify({ id: toNumber(event.active.id.toString().replace("timer:", "")), over: toNumber(event.over?.id.toString().replace("drop:", "")) })
        if (event.over) {
            const timerId = Number.parseInt(event.active.id.toString().replace("timer:", ""))
            let toId = Number.parseInt(event.over.id.toString().replace("drop:", ""))
            // debug.state = JSON.stringify({ timerId, toId })
            if (timerId == toId - 1)
                toId--
            moveTimer(timerId, toId)
        }
    }

    function dragCancel(_event: DragCancelEvent) {
        dragging.state = undefined
    }

    return <DndContext sensors={sensors} onDragStart={dragStart} onDragEnd={dragEnd} onDragCancel={dragCancel}>
        {render_timers}
    </DndContext>
}
