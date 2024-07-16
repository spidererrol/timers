import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ColourWheelIcon, DeleteIcon } from "@/components/Icons"
import NumberScroller from "@/components/NumberScroller"


export default function EditStage({ timer, stageno, updateTimer }: { timer: TimerData; stageno: number; updateTimer: updateTimerFunction} ) {
    const stage = timer.stages[stageno]
    return (
        <div className="timeset">
            <div className="timerstage">{stageno + 1}</div>
            <NumberScroller min={0} max={24} value={stage.duration.hours}
                updateValue={n => { updateTimer(timer.id, t => { t.stages[stageno].duration.hours = n }) }} />
            <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
            <NumberScroller min={0} max={59} value={stage.duration.minutes}
                updateValue={n => { updateTimer(timer.id, t => { t.stages[stageno].duration.minutes = n }) }} />
            <div className="seperator"><span>&nbsp;</span><span>:</span><span>&nbsp;</span></div>
            <NumberScroller min={0} max={59} value={stage.duration.seconds}
                updateValue={n => { updateTimer(timer.id, t => { t.stages[stageno].duration.seconds = n }) }} />
            <div className="controls">
                <FingerButton title="Colours"><ColourWheelIcon /></FingerButton>
                <div className="flexpadding">&nbsp;</div>
                <FingerButton title="Remove Stage" onClick={() => { updateTimer(timer.id, t => t.delStage(stageno)) }}><DeleteIcon /></FingerButton>
            </div>
        </div>
    )
}
