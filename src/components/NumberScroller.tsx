import { padnumber } from "@/libs/helpers"
import FingerButton from "@/components/FingerButton"
import { DecIcon, IncIcon } from "@/components/Icons"
import "./NumberScroller.css"

interface NumberScrollerProps {
    value: number
    increment: () => void
    decrement: () => void
    min?: number
    max?: number
}

export default function NumberScroller({ value, increment, decrement, min, max }: NumberScrollerProps) {
    let incClass = "short"
    let decClass = "short"
    if (max !== undefined && value >= max)
        incClass += " disabled"
    if (min !== undefined && value <= min)
        decClass += " disabled"
    return (
        <div className="NumberScroller">
            <FingerButton className={incClass} onClick={increment}><IncIcon /></FingerButton>
            <p className="digits">{padnumber(value)}</p>
            <FingerButton className={decClass} onClick={decrement}><DecIcon /></FingerButton>
        </div>
    )
}

