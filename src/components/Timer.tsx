import TimerData from "@/objects/TimerData"
import { updateTimerFunction } from "@/libs/helpers"
import TimerRun from "@/components/Timer/Run"
import TimerSettings from "@/components/Timer/Settings"
import TimerWrapper from "@/components/Timer/Wrapper"

export default function Timer({ timer, delTimer, updateTimer, dragging }: { timer: TimerData, delTimer: (id: number) => void, updateTimer: updateTimerFunction, dragging: boolean }) {
    if (timer.configured) {
        return (<TimerWrapper timer={timer} dragging={dragging}><TimerRun timer={timer} updateTimer={updateTimer} /></TimerWrapper>)
    } else {
        return (
            <TimerWrapper timer={timer} dragging={dragging}>
                <TimerSettings timer={timer} delTimer={delTimer} updateTimer={updateTimer} />
            </TimerWrapper>
        )
    }
}
