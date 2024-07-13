import TimerData from "@/objects/TimerData"
import Image from "next/image"
import Delete from "famfamfam-silk/dist/png/delete.png"

function Timer({ timer, delTimer }: { timer: TimerData, delTimer: (id: number) => void }) {
    return (
        <div className="Timer">
            Timer [{timer.id}]
            <button className="delTimer" onClick={() => delTimer(timer.id)}><Image alt="X" title="Delete this timer" src={Delete} /></button>
        </div>
    )
}

export default Timer