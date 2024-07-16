import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import FingerButton from "../FingerButton"
import { DeleteIcon, AddIcon, DoneIcon } from "../Icons"
import EditStages from "./EditStages"

export default function TimerSettings({ timer, delTimer, updateTimer: up_updateTimer }: { timer: TimerData; delTimer: (id: number) => void; updateTimer: updateTimerFunction} ) {
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
        <FingerButton className="done" title="Done" onClick={() => updateTimer(timer.id, t => { t.configured = true })}><DoneIcon /></FingerButton>
    </div>
    )
}
