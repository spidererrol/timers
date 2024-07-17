import { tState } from "@/libs/State"
import { htmlcolour } from "@/objects/TimerData"
import { ColourSwatch } from "@/components/ColourSwatch"
import NumberScroller from "@/components/NumberScroller"
import { useState } from "react"
import { TJHCSSProperties } from "@/libs/CSSExtensions"

type colourUpdater = (uc: (c: htmlcolour) => void) => void
type partUpdater = (n: number) => void

function ColourPart({ PartName, colour, value, max, updatePart }: { PartName: "Hue" | "Saturation" | "Brightness"; value: number; max: number; colour: htmlcolour; updatePart: partUpdater }) {
    const Edit = new tState(useState(false))
    const partname = PartName.toLowerCase()
    return <tr>
        <th onClick={() => Edit.toggle()}>{PartName}:</th>
        <td className="ColourSliderContainer">
            {Edit.state
                ? <NumberScroller value={value} min={0} max={max} updateValue={updatePart} />
                : <></>
            }
            <input className={PartName + "Slider ColourSlider"} type="range" style={{ "--tjh-hue": colour.hue, "--tjh-saturation": colour.saturation, "--tjh-brightness": colour.brightness } as TJHCSSProperties} min={0} max={max} value={value} onChange={e => updatePart(e.target.valueAsNumber)} />
        </td>
        <td onClick={() => Edit.toggle()}><ColourSwatch colour={colour} /></td>
    </tr>

}

export function ViewEditColour({ Edit, colour, updateColour }: { Edit: tState; colour: htmlcolour; updateColour: colourUpdater }) {
    const Hue = new tState(useState(false))
    return <>
        {Edit.state ?
            <>
                <ColourPart PartName="Hue" colour={colour} value={colour.hue} max={359} updatePart={n => updateColour(c => c.hue = n)} />
                <ColourPart PartName="Saturation" colour={colour} value={colour.saturation} max={100} updatePart={n => updateColour(c => c.saturation = n)} />
                <ColourPart PartName="Brightness" colour={colour} value={colour.brightness} max={100} updatePart={n => updateColour(c => c.brightness = n)} />
            </>
            : <></>}
    </>
}
