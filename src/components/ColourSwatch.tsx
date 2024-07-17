import { htmlcolour } from "@/objects/TimerData"

export function ColourSwatch({ colour }: { colour: htmlcolour} ) {
    return <div className="colourswatch" style={{ backgroundColor: colour.toString(),borderColor: colour.invert().toString(),borderWidth:"1px" }}>&nbsp;</div>
}
