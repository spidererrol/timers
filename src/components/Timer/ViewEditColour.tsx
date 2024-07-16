import { tState } from "@/libs/State"
import { htmlcolour } from "@/objects/TimerData"
import { ColourSwatch } from "../ColourSwatch"
import NumberScroller from "../NumberScroller"

export function ViewEditColour({ Edit, colour, updateColour }: { Edit: tState; colour: htmlcolour; updateColour: (uc: (c: htmlcolour) => void) => void} ) {
    return <>
        {Edit.state ?
            <>
                <tr>
                    <th onClick={() => Edit.toggle()}>Hue:</th>
                    <td><NumberScroller value={colour.hue} min={0} max={359} updateValue={n => updateColour(c => c.hue = n)} /></td>
                    <td onClick={() => Edit.toggle()}><ColourSwatch colour={colour} /></td>
                </tr>
                <tr>
                    <th onClick={() => Edit.toggle()}>Saturation:</th>
                    <td><NumberScroller value={colour.saturation} min={0} max={100} updateValue={n => updateColour(c => c.saturation = n)} /></td>
                    <td onClick={() => Edit.toggle()}><ColourSwatch colour={colour} /></td>
                </tr>
                <tr>
                    <th onClick={() => Edit.toggle()}>Brightness:</th>
                    <td><NumberScroller value={colour.brightness} min={0} max={359} updateValue={n => updateColour(c => c.brightness = n)} /></td>
                    <td onClick={() => Edit.toggle()}><ColourSwatch colour={colour} /></td>
                </tr>
            </>
            : <></>}
    </>
}
