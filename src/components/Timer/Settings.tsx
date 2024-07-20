import { colourUpdater, updateTimerFunction } from "@/libs/helpers"
import TimerData, { htmlcolour } from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { DeleteIcon, AddIcon, DoneIcon, EditIcon, ClockIcon, CopyIcon } from "@/components/Icons"
import EditStages from "@/components/Timer/EditStages"
import { tState } from "@/libs/State"
import { useState } from "react"
import { ViewEditColour } from "@/components/Timer/ViewEditColour"
import { ColourSwatch } from "@/components/ColourSwatch"

function VEColour({ name, colour, updateColour }: { name: string; colour: htmlcolour; updateColour: colourUpdater }) {
    const Edit = new tState(useState(false))
    return <>
        <tr onClick={() => Edit.toggle()}>
            <th className="text-xs">{name} Colour:</th>
            <td><ColourSwatch colour={colour} /></td>
            <td><FingerButton><EditIcon /></FingerButton></td>
        </tr>
        <ViewEditColour Edit={Edit} colour={colour} updateColour={updateColour} />
    </>
}

function DoneButton({ updateTimer, timer }: { updateTimer: (id: number, update: (timer: TimerData) => void) => void; timer: TimerData }) {
    return <FingerButton className="done" title="Done" onClick={() => updateTimer(timer.id, t => { t.configured = true })}><DoneIcon /></FingerButton>
}

export default function TimerSettings({ timer, copyTimer, delTimer, updateTimer: up_updateTimer }: { timer: TimerData; copyTimer: () => void; delTimer: (id: number) => void; updateTimer: updateTimerFunction }) {
    const updateTimer = (id: number, update: (timer: TimerData) => void) => {
        up_updateTimer(id, t => { update(t) })
    }
    return (<div className="TimerSettings">
        <div className="toolbar">
            <FingerButton className="copy" title="Copy" onClick={copyTimer}><CopyIcon /></FingerButton>
            <FingerButton className="delTimer" title="Delete this Timer" onClick={() => delTimer(timer.id)}><DeleteIcon /></FingerButton>
            <div className="flex-spacer"></div>
            <DoneButton updateTimer={updateTimer} timer={timer} />
        </div>
        <p className="label">Name:</p>
        <input type="text" value={timer.name} onChange={e => updateTimer(timer.id, t => t.name = e.target.value)} size={8} placeholder="Name" />
        <table className="editcolourtable">
            <VEColour name="Default" colour={timer.defaultcolor} updateColour={uc => updateTimer(timer.id, t => uc(timer.defaultcolor))} />
            <VEColour name="Finished" colour={timer.finishedcolor} updateColour={uc => updateTimer(timer.id, t => uc(timer.finishedcolor))} />
        </table>
        <div className="editstages">
            <EditStages timer={timer} updateTimer={updateTimer} />
        </div>
        <FingerButton className="short wide" title="Add Stage" onClick={() => updateTimer(timer.id, t => t.addStage())}><AddIcon /><ClockIcon /></FingerButton>
        <br />
        <DoneButton updateTimer={updateTimer} timer={timer} />
    </div>
    )
}
