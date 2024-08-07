import { State } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ImportIcon, ExportIcon, AddIcon, LoadIcon, SaveIcon } from "@/components/Icons"
import Timers from "@/components/Timers"
import { PageName } from "@/components/PageSelector"
import { useSensor, PointerSensor, useSensors, DragStartEvent, DragEndEvent, DragCancelEvent, DndContext } from "@dnd-kit/core"
import { useState } from "react"

interface MainViewProps {
    timers: TimerData[]
    addTimer: () => void
    copyTimer: (id: number) => void
    delTimer: (id: number) => void
    moveTimer: (from: number, to: number, update?: (t: TimerData) => void) => void
    updateTimer: (id: number, update: (timer: TimerData) => void) => void
    pageShow: State<PageName>
}

export function MainView({ timers, addTimer, copyTimer, delTimer, moveTimer, updateTimer, pageShow }: MainViewProps) {
    //TODO: Implement <MinTimers> and <MinTimer> (there is only a "Run" mode for minimised timers)
    //TODO: Both min and restored timers should generate all timers but add "display: none" for non-matching.
    //TODO: Allow drag & drop between min & restore.


    const dragging = new State(useState<number | undefined>(undefined))
    const myPointerSensor = useSensor(PointerSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    const sensors = useSensors(myPointerSensor)

    function dragStart(event: DragStartEvent) {
        dragging.state = Number.parseInt(event.active.id.toString().replace("timer:", ""))
    }

    function dragEnd(event: DragEndEvent) {
        dragging.state = undefined
        if (event.over) {
            const timerId = Number.parseInt(event.active.id.toString().replace(/^\w+:/, ""))
            const fullToId = event.over.id.toString()
            const toIdMin = fullToId.startsWith("min:")
            let toId = Number.parseInt(fullToId.replace(/^\w+:/, ""))
            if (timerId == toId - 1)
                toId--
            moveTimer(timerId, toId, t => t.minimised = toIdMin)
        }
    }

    function dragCancel(_event: DragCancelEvent) {
        dragging.state = undefined
    }

    return <DndContext sensors={sensors} onDragStart={dragStart} onDragEnd={dragEnd} onDragCancel={dragCancel}>
        <div className="outer">
            <div className="minimised_area">
                <Timers timers={timers} mode="Min" copyTimer={copyTimer} delTimer={delTimer} updateTimer={updateTimer} dragging={dragging} />
            </div>
            <div className="timers">
                <Timers timers={timers} mode="Normal" copyTimer={copyTimer} delTimer={delTimer} updateTimer={updateTimer} dragging={dragging} />
                <div className="items-center buttonsPanel">
                    <div className="mainButtons">
                        <FingerButton onClick={() => pageShow.state = PageName.LoadTimers}><LoadIcon /></FingerButton>
                        <FingerButton onClick={() => pageShow.state = PageName.SaveTimers}><SaveIcon /></FingerButton>
                        <FingerButton onClick={() => pageShow.state = PageName.AllImporter}><ImportIcon /></FingerButton>
                        <FingerButton onClick={() => pageShow.state = PageName.AllExporter}><ExportIcon /></FingerButton>
                    </div>
                    <FingerButton className="addTimer" title="Add new timer" onClick={addTimer}><AddIcon /></FingerButton>
                </div>
            </div>
        </div>
    </DndContext>
}
