import TimerData from "@/objects/TimerData"
import { useDraggable } from "@dnd-kit/core"
import { ReactNode } from "react"
import { CSS } from '@dnd-kit/utilities'

export default function TimerWrapper({ children, timer, dragging }: { children: ReactNode; timer: TimerData, dragging: boolean }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'timer:' + timer.id,
    })
    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined


    return (
        <fieldset className={"Timer" + (dragging ? " NoDrop" : "")} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <legend>{timer.name}</legend>
            {children}
        </fieldset>
    )
}
