import { htmlcolour } from "@/objects/TimerData"

export function ColourSwatch({ colour }: { colour: htmlcolour} ) {
    return <div className="colourswatch" style={{ backgroundColor: colour.toString() }}>&nbsp;</div>
}
