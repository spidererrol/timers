import TimerData from "@/objects/TimerData"
import { useDraggable } from "@dnd-kit/core"
import { ReactNode, useContext } from "react"
import { CSS } from '@dnd-kit/utilities'
import { condClasses } from "@/libs/helpers"
import { TickContext } from "@/app/page"

function alarmA(tick: Date): boolean {
    return (Math.floor(tick.getMilliseconds() / 500) % 2) == 0
}

export default function TimerWrapper({ children, timer, dragging }: { children: ReactNode; timer: TimerData, dragging: boolean }) {
    const tick = useContext(TickContext)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'timer:' + timer.id,
    })
    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined

    const classNames = condClasses({
        "Timer": true,
        "NoDrop": dragging,
        "minimised": timer.minimised,
        "alarm": timer.alarmActive(),
        "a": timer.alarmActive() && alarmA(tick),
        "b": timer.alarmActive() && !alarmA(tick)
    })

    return (
        <fieldset className={classNames} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <legend>{timer.name}</legend>
            {children}
        </fieldset>
    )
}
