import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import { useState } from "react"
import { tState } from "@/libs/State"
import { ViewEditDuration } from "@/components/ViewEditDuration"
import { ColourSwatch } from "@/components/ColourSwatch"
import { ViewEditColour } from "@/components/Timer/ViewEditColour"
import FingerButton from "@/components/FingerButton"
import { DeleteIcon } from "@/components/Icons"

export default function EditColour({ timer, stageno, colourno, updateTimer }: { timer: TimerData; stageno: number; colourno: number; updateTimer: updateTimerFunction }) {
    const EditFrom = new tState(useState(false))
    const EditTo = new tState(useState(false))
    const colour = timer.stages[stageno].colors[colourno]
    return <div className="editcolour">
        <table className="editcolourtable">
            <tr>
                <th onClick={() => EditFrom.toggle()}>From:</th>
                <td><ViewEditDuration edit={EditFrom} duration={colour.startpoint} updateDuration={ud => { updateTimer(timer.id, t => ud(t.stages[stageno].colors[colourno].startpoint)) }} />               </td>
                <td onClick={() => EditFrom.toggle()}><ColourSwatch colour={colour.startcolor} /></td>
            </tr>
            <ViewEditColour Edit={EditFrom} colour={colour.startcolor} updateColour={uc => updateTimer(timer.id, t => uc(t.stages[stageno].colors[colourno].startcolor))} />
            <tr>
                <th onClick={() => EditTo.toggle()}>To:</th>
                <td><ViewEditDuration edit={EditTo} duration={colour.endpoint} updateDuration={ud => { updateTimer(timer.id, t => ud(t.stages[stageno].colors[colourno].endpoint)) }} />               </td>
                <td onClick={() => EditTo.toggle()}><ColourSwatch colour={colour.endcolor} /></td>
            </tr>
            <ViewEditColour Edit={EditTo} colour={colour.endcolor} updateColour={uc => updateTimer(timer.id, t => uc(t.stages[stageno].colors[colourno].endcolor))} />
        </table>
        <div className="controls"><FingerButton title="Delete colour change" onClick={() => updateTimer(timer.id, t => t.stages[stageno].delColour(colourno))}><DeleteIcon /></FingerButton></div>
    </div>
}