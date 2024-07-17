import { padnumber } from "@/libs/helpers"
import FingerButton from "@/components/FingerButton"
import { DecIcon, IncIcon } from "@/components/Icons"
import "./NumberScroller.css"

interface NumberScrollerProps {
    value: number
    updateValue: (n: number) => void
    min?: number
    max?: number
    digits?: number
}

export default function NumberScroller({ value, updateValue, min, max, digits = 2 }: NumberScrollerProps) {
    if (Number.isNaN(value))
        value = 0
    let incClass = "short"
    let decClass = "short"
    if (max !== undefined && value >= max)
        incClass += " disabled"
    if (min !== undefined && value <= min)
        decClass += " disabled"
    return (
        <div className="NumberScroller">
            <FingerButton className={incClass} onClick={() => updateValue(Math.min(value + 10, max ?? Number.POSITIVE_INFINITY))}><IncIcon /><IncIcon /></FingerButton>
            <FingerButton className={incClass} onClick={() => updateValue(value + 1)}><IncIcon /></FingerButton>
            {/* <p className="digits">{padnumber(value)}</p> */}
            <input className="digits" type="number" min={min} max={max} size={digits} value={value}
                onChange={
                    e => {
                        if (
                            !Number.isNaN(e.target.valueAsNumber) &&
                            (max === undefined || e.target.valueAsNumber <= max) &&
                            (min === undefined || e.target.valueAsNumber >= min)
                        ) {
                            updateValue(e.target.valueAsNumber)
                        }
                    }
                }
            />
            <FingerButton className={decClass} onClick={() => updateValue(value - 1)}><DecIcon /></FingerButton>
            <FingerButton className={decClass} onClick={() => updateValue(Math.max(value - 10, min ?? Number.NEGATIVE_INFINITY))}><DecIcon /><DecIcon /></FingerButton>
        </div>
    )
}

