import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"

export interface TimerProps {
    timer: TimerData
    copyTimer: () => void
    delTimer: (id: number) => void
    updateTimer: updateTimerFunction
    dragging: boolean
}

export type TimerComponent = (props: TimerProps) => JSX.Element