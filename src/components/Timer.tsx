import { ReactNode } from "react"
import TimerData from "@/objects/TimerData"
import { DeleteIcon, DoneIcon, EditIcon, PauseIcon, PlayIcon, StopIcon } from "@/components/Icons"
import FingerButton from "@/components/FingerButton"
import NumberScroller from "@/components/NumberScroller"
import { updateTimerFunction } from "@/libs/helpers"

function TimerWrapper({ children, timer }: { children: ReactNode, timer: TimerData }) {
    return (
        <fieldset className="Timer">
            <legend>{timer.name} {timer.displayCurrent()}</legend>
            {children}
        </fieldset>
    )
}

function TimerSettings({ timer, delTimer, updateTimer }: { timer: TimerData, delTimer: (id: number) => void, updateTimer: updateTimerFunction }) {
    return (<div className="TimerSettings">
        <div className="toolbar">
            <FingerButton className="delTimer" title="Delete this Timer" onClick={() => delTimer(timer.id)}><DeleteIcon /></FingerButton>
        </div>
        <input type="text" value={timer.name} onChange={e => updateTimer(timer.id, t => timer.name = e.target.value)} size={8} />
        <div className="timeset">
            <NumberScroller min={0} max={24} value={timer.duration.hours}
                updateValue={n => { updateTimer(timer.id, t => { t.duration.hours = n }) }}
            />
            <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
            <NumberScroller min={0} max={59} value={timer.duration.minutes}
                updateValue={n => { updateTimer(timer.id, t => { t.duration.minutes = n }) }}
            />
            <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
            <NumberScroller min={0} max={59} value={timer.duration.seconds}
                updateValue={n => { updateTimer(timer.id, t => { t.duration.seconds = n }) }}
            />
            <div className="spacer">&nbsp;</div>
        </div>
        <FingerButton className="done" title="Done" onClick={() => updateTimer(timer.id, t => { t.configured = true })} ><DoneIcon /></FingerButton>
    </div>
    )
}

function TimerRun({ timer, updateTimer }: { timer: TimerData, updateTimer: updateTimerFunction }) {
    return (<div className={"TimerRun" + (timer.finished ? " finished" : "")} style={{ "background": timer.color.toString() }}>
        <div className="toolbar">
            <FingerButton className="editTimer" title="Edit this Timer" onClick={() => updateTimer(timer.id, t => { t.configured = false })}><EditIcon /></FingerButton>
        </div>
        <p className={"timeleft"}>{timer.current.toDisplay()}</p>
        {timer.paused || !timer.started ? (<FingerButton onClick={() => updateTimer(timer.id, t => { if (t.paused) { t.resume() } else { t.start() } })}><PlayIcon /></FingerButton>) : <></>}
        {timer.started && !timer.paused && !timer.finished ? (<FingerButton onClick={() => updateTimer(timer.id, t => { t.pause() })}><PauseIcon /></FingerButton>) : <></>}
        {timer.started ?
            (
                <FingerButton onClick={() => updateTimer(timer.id, t => { t.stop() })}><StopIcon /></FingerButton>
            )
            :
            <></>
        }
    </div>)
}

export default function Timer({ timer, delTimer, updateTimer }: { timer: TimerData, delTimer: (id: number) => void, updateTimer: updateTimerFunction }) {
    if (timer.configured) {
        return (<TimerWrapper timer={timer}><TimerRun timer={timer} updateTimer={updateTimer} /></TimerWrapper>)
    } else {
        return (
            <TimerWrapper timer={timer}>
                <TimerSettings timer={timer} delTimer={delTimer} updateTimer={updateTimer} />
            </TimerWrapper>
        )
    }
}
