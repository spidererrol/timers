import { condClasses } from "@/libs/helpers"
import FingerButton from "../FingerButton"
import { RestoreIcon } from "../Icons"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from '@dnd-kit/utilities'
import { TimerProps } from "../../libs/TimerProps"

export default function TimerMin({ timer, copyTimer, delTimer, updateTimer, dragging }: TimerProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'mintimer:' + timer.id,
    })
    const style = transform ? {
        transform: CSS.Translate.toString(transform),
        backgroundColor: timer.color.toString(),
    } : {
        backgroundColor: timer.color.toString(),
    }

    const classes = condClasses({
        "TimerMin": true,
        "NoDrop": dragging,
        "finished": timer.finished,
        "minimised": timer.minimised
    })

    return <div className={classes} ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <FingerButton onClick={() => updateTimer(timer.id, t => t.minimised = false)}>
            <span className="timername">{timer.name}</span>
            <span className={"timeleft"}>{timer.current.toDisplay()}</span>
            <RestoreIcon />
        </FingerButton>
    </div>
    // I don't need this, the copy in TimerRun is enough:
    // {timer.alarmActive() ? <audio src="/alarm.wav" autoPlay={true} onEnded={() => { timer.stopAlarms() }} /> : <></>}
}
