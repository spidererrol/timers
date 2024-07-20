import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { EditIcon, PlayIcon, PauseIcon, StopIcon, RestartIcon, AlarmMuteIcon } from "@/components/Icons"
import { tState } from "@/libs/State"
import { useState } from "react"

export default function TimerRun({ timer, updateTimer }: { timer: TimerData; updateTimer: updateTimerFunction }) {
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
            {timer.paused || !timer.started ? (<FingerButton className="Play" onClick={() => updateTimer(timer.id, t => { if (t.paused) { t.resume() } else { t.start() } })}><PlayIcon /></FingerButton>) : <></>}
            {timer.started && !timer.paused && !timer.finished ? (<FingerButton onClick={() => updateTimer(timer.id, t => { t.pause() })}><PauseIcon /></FingerButton>) : <></>}
            {timer.started || timer.finished ? <FingerButton onClick={() => updateTimer(timer.id, t => { t.stop() })}><StopIcon /></FingerButton> : <></>}
            {timer.started || timer.paused ? <FingerButton onClick={() => updateTimer(timer.id, t => { t.reset() })}><RestartIcon /></FingerButton> : <></>}
            {timer.alarmActive() ? <FingerButton onClick={() => { timer.stopAlarms() }}><AlarmMuteIcon /></FingerButton> : <></>}
        </div>
        {timer.alarmActive() ? <audio src="/alarm.wav" autoPlay={true} onEnded={() => { timer.stopAlarms() }} /> : <></>}
    </div>)
}
