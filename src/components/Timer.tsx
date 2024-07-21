import TimerSettings from "@/components/Timer/Settings"
import TimerWrapper from "@/components/Timer/Wrapper"
import TimerRun from "./Timer/Run"
import { TimerProps } from "@/libs/TimerProps"

export default function Timer({ timer, copyTimer, delTimer, updateTimer, dragging }: TimerProps) {
    if (timer.configured) {
        return (<TimerWrapper timer={timer} dragging={dragging}><TimerRun timer={timer} updateTimer={updateTimer} /></TimerWrapper>)
    } else {
        return (
            <TimerWrapper timer={timer} dragging={dragging}>
                <TimerSettings timer={timer} copyTimer={copyTimer} delTimer={delTimer} updateTimer={updateTimer} />
            </TimerWrapper>
        )
    }
}
