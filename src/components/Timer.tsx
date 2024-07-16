import { ReactNode } from "react"
import TimerData from "@/objects/TimerData"
import { AddIcon, DeleteIcon, DoneIcon, EditIcon, PauseIcon, PlayIcon, StopIcon } from "@/components/Icons"
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

function EditStage({ timer, stageno, updateTimer }: { timer: TimerData; stageno: number; updateTimer: updateTimerFunction }) {
    const stage = timer.stages[stageno]
    return (
        <div className="timeset">
            <NumberScroller min={0} max={24} value={stage.duration.hours}
                updateValue={n => { updateTimer(timer.id, t => { t.stages[stageno].duration.hours = n }) }}
            />
            <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
            <NumberScroller min={0} max={59} value={stage.duration.minutes}
                updateValue={n => { updateTimer(timer.id, t => { t.stages[stageno].duration.minutes = n }) }}
            />
            <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
            <NumberScroller min={0} max={59} value={stage.duration.seconds}
                updateValue={n => { updateTimer(timer.id, t => { t.stages[stageno].duration.seconds = n }) }}
            />
            <div className="controls">
                <FingerButton title="Remove Stage" onClick={() => { updateTimer(timer.id, t => t.delStage(stageno)) }}><DeleteIcon /></FingerButton>
            </div>
        </div>
    )
}

function EditStages({ timer, updateTimer }: { timer: TimerData; updateTimer: updateTimerFunction }) {
    return timer.stages.map((_s, i) => <EditStage key={i} timer={timer} stageno={i} updateTimer={updateTimer} />)
}

function TimerSettings({ timer, delTimer, updateTimer: up_updateTimer }: { timer: TimerData, delTimer: (id: number) => void, updateTimer: updateTimerFunction }) {
    const updateTimer = (id: number, update: (timer: TimerData) => void) => {
        up_updateTimer(id, t => { update(t); t.stop() })
    }
    return (<div className="TimerSettings">
        <div className="toolbar">
            <FingerButton className="delTimer" title="Delete this Timer" onClick={() => delTimer(timer.id)}><DeleteIcon /></FingerButton>
        </div>
        <input type="text" value={timer.name} onChange={e => updateTimer(timer.id, t => timer.name = e.target.value)} size={8} />
        <EditStages timer={timer} updateTimer={updateTimer} />
        <FingerButton className="short wide" title="Add Stage" onClick={() => updateTimer(timer.id, t => t.addStage())}><AddIcon /></FingerButton>
        <br />
        <FingerButton className="done" title="Done" onClick={() => updateTimer(timer.id, t => { t.configured = true })} ><DoneIcon /></FingerButton>
    </div>
    )
}

function TimerRun({ timer, updateTimer }: { timer: TimerData, updateTimer: updateTimerFunction }) {
    return (<div className={"TimerRun" + (timer.finished ? " finished" : "")} style={{ "background": timer.color.toString() }}>
        <div className="toolbar">
            <FingerButton className="editTimer" title="Edit this Timer" onClick={() => updateTimer(timer.id, t => { t.configured = false })}><EditIcon /></FingerButton>
        </div>
        <p>
            {timer.stages.length > 1 ? <span className="timerstage">{timer._currentstage + 1}<br /><span className="total">{timer.stages.length}</span></span> : <></>}
            <span className={"timeleft"}>{timer.current.toDisplay()}</span>
            <span className={"nexttime"}>{timer.nextstage !== undefined ? timer.nextstage.duration.toDisplay() : <></>}</span>
        </p>
        <div className="controls">
        {timer.paused || !timer.started ? (<FingerButton onClick={() => updateTimer(timer.id, t => { if (t.paused) { t.resume() } else { t.start() } })}><PlayIcon /></FingerButton>) : <></>}
        {timer.started && !timer.paused && !timer.finished ? (<FingerButton onClick={() => updateTimer(timer.id, t => { t.pause() })}><PauseIcon /></FingerButton>) : <></>}
        {timer.started || timer.finished ? <FingerButton onClick={() => updateTimer(timer.id, t => { t.stop() })}><StopIcon /></FingerButton> : <></>}
        </div>
        {timer.finished?<audio src="/alarm.wav" autoPlay={true} />:<></>}
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
