import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import EditColour from "@/components/Timer/EditColour"
import FingerButton from "@/components/FingerButton"
import { AddIcon, ClockIcon, ColourWheelIcon } from "@/components/Icons"
import { tState } from "@/libs/State"

function EditColoursSet({ timer, stageno, updateTimer }: { timer: TimerData, stageno: number, updateTimer: updateTimerFunction }) {
    const state = timer.stages[stageno]
    return state.colors.map((_cd, i) => <EditColour key={i} timer={timer} stageno={stageno} colourno={i} updateTimer={updateTimer} />)
}

export default function EditColours({ timer, stageno, updateTimer, ColoursMode }: { timer: TimerData, stageno: number, updateTimer: updateTimerFunction, ColoursMode: tState }) {
    return <div className="editcolours">
        <div className="toolbar">
            <FingerButton title="Colours" onClick={() => { ColoursMode.toggle(); timer.stages[stageno].sortColours() }}><ClockIcon duration={timer.stages[stageno].duration} /></FingerButton>
        </div>
        <EditColoursSet timer={timer} stageno={stageno} updateTimer={updateTimer} />
        <FingerButton className="short wide" onClick={() => updateTimer(timer.id, t => t.stages[stageno].addColour())}><AddIcon /><ColourWheelIcon /></FingerButton>
    </div>
}