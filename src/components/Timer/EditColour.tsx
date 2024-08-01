import { updateTimerFunction } from "@/libs/helpers"
import TimerData, { TimerStageColorData } from "@/objects/TimerData"
import { useState } from "react"
import { tState } from "@/libs/State"
import { ViewEditDuration } from "@/components/ViewEditDuration"
import { ColourSwatch } from "@/components/ColourSwatch"
import { ViewEditColour } from "@/components/Timer/ViewEditColour"
import FingerButton from "@/components/FingerButton"
import { ClockIcon, DeleteIcon, SecondsIcon } from "@/components/Icons"

interface EditOnePartProps {
    FromTo: string
    EditStart: boolean
    Edit: tState
    SecondsMode: tState
    colour: TimerStageColorData
    updateTimer: updateTimerFunction
    timer: TimerData
    stageno: number
    colourno: number
}

function EditOnePart({ FromTo, EditStart, Edit, SecondsMode, colour, updateTimer, timer, stageno, colourno }: EditOnePartProps) {
    return <>
        <tr>
            <th onClick={() => Edit.toggle()}>{FromTo}:</th>
            <td><ViewEditDuration edit={Edit} useSeconds={SecondsMode} duration={EditStart ? colour.startpoint : colour.endpoint} updateDuration={ud => {
                updateTimer(timer.id, t => {
                    var col = t.stages[stageno].colors[colourno]
                    return ud(EditStart ? col.startpoint : col.endpoint)
                })
            }} />               </td>
            <td onClick={() => Edit.toggle()}><ColourSwatch colour={EditStart ? colour.startcolor : colour.endcolor} />{Edit.state
                ? <FingerButton onClick={e => { e.stopPropagation(); SecondsMode.toggle() }}>{SecondsMode.state
                    ? <ClockIcon duration={EditStart ? colour.startpoint : colour.endpoint} />
                    : <SecondsIcon duration={EditStart ? colour.startpoint : colour.endpoint} />}</FingerButton>
                : <></>}</td>
        </tr>
        <ViewEditColour Edit={Edit} colour={EditStart ? colour.startcolor : colour.endcolor} updateColour={uc => updateTimer(timer.id, t => {
            var col = t.stages[stageno].colors[colourno]
            return uc(EditStart ? col.startcolor : col.endcolor)
        })} />
    </>
}

interface EditColourProps {
    timer: TimerData
    stageno: number
    colourno: number
    updateTimer: updateTimerFunction
}

export default function EditColour({ timer, stageno, colourno, updateTimer }: EditColourProps) {
    const EditFrom = new tState(useState(false))
    const EditTo = new tState(useState(false))
    const SecondsMode = new tState(useState(false))
    const colour = timer.stages[stageno].colors[colourno]
    return <div className="editcolour">
        <table className="editcolourtable">
            <EditOnePart FromTo="From" EditStart={true} Edit={EditFrom} SecondsMode={SecondsMode} colour={colour} updateTimer={updateTimer} timer={timer} stageno={stageno} colourno={colourno} />
            <EditOnePart FromTo="To" EditStart={false} Edit={EditTo} SecondsMode={SecondsMode} colour={colour} updateTimer={updateTimer} timer={timer} stageno={stageno} colourno={colourno} />
        </table>
        <div className="controls"><FingerButton title="Delete colour change" onClick={() => updateTimer(timer.id, t => t.stages[stageno].delColour(colourno))}><DeleteIcon /></FingerButton></div>
    </div>
}
