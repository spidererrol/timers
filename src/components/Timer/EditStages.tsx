import { updateTimerFunction } from "@/libs/helpers"
import TimerData from "@/objects/TimerData"
import EditStage from "@/components/Timer/EditStage"

export default function EditStages({ timer, updateTimer }: { timer: TimerData; updateTimer: updateTimerFunction }) {
    return timer.stages.map(
        (s, i) => <EditStage key={i} timer={timer} stageno={i} updateTimer={updateTimer} />
    )
}
