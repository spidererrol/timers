import TimerData from "@/objects/TimerData"
import { ReactNode } from "react"

export default function TimerWrapper({ children, timer }: { children: ReactNode; timer: TimerData} ) {
    return (
        <fieldset className="Timer">
            <legend>{timer.name} {timer.displayCurrent()}</legend>
            {children}
        </fieldset>
    )
}
