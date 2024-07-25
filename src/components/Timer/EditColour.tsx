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
    Edit: tState
    SecondsMode: tState
    colour: TimerStageColorData
    updateTimer: updateTimerFunction
    timer: TimerData
    stageno: number
    colourno: number
}

function EditOnePart({ FromTo, Edit, SecondsMode, colour, updateTimer, timer, stageno, colourno }: EditOnePartProps) {
    return <>
        <tr>
            <th onClick={() => Edit.toggle()}>{FromTo}:</th>
            <td><ViewEditDuration edit={Edit} useSeconds={SecondsMode} duration={colour.startpoint} updateDuration={ud => { updateTimer(timer.id, t => ud(t.stages[stageno].colors[colourno].startpoint)) }} />               </td>
            <td onClick={() => Edit.toggle()}><ColourSwatch colour={colour.startcolor} />{Edit.state
                ? <FingerButton onClick={e => { e.stopPropagation(); SecondsMode.toggle() }}>{SecondsMode.state
                    ? <ClockIcon duration={colour.endpoint} />
                    : <SecondsIcon duration={colour.endpoint} />}</FingerButton>
                : <></>}</td>
        </tr>
        <ViewEditColour Edit={Edit} colour={colour.startcolor} updateColour={uc => updateTimer(timer.id, t => uc(t.stages[stageno].colors[colourno].startcolor))} />
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
            <EditOnePart FromTo="From" Edit={EditFrom} SecondsMode={SecondsMode} colour={colour} updateTimer={updateTimer} timer={timer} stageno={stageno} colourno={colourno} />
            <EditOnePart FromTo="To" Edit={EditTo} SecondsMode={SecondsMode} colour={colour} updateTimer={updateTimer} timer={timer} stageno={stageno} colourno={colourno} />
        </table>
        <div className="controls"><FingerButton title="Delete colour change" onClick={() => updateTimer(timer.id, t => t.stages[stageno].delColour(colourno))}><DeleteIcon /></FingerButton></div>
    </div>
}
