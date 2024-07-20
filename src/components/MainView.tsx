import { State } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ImportIcon, ExportIcon, AddIcon, LoadIcon, SaveIcon } from "@/components/Icons"
import Timers from "@/components/Timers"
import { PageName } from "@/components/PageSelector"

interface MainViewProps {
    timers: TimerData[]
    addTimer: () => void
    copyTimer: (id: number) => void
    delTimer: (id: number) => void
    moveTimer: (from: number, to: number) => void
    updateTimer: (id: number, update: (timer: TimerData) => void) => void
    pageShow: State<PageName>
}

export function MainView({ timers, addTimer, copyTimer, delTimer, moveTimer, updateTimer, pageShow }: MainViewProps) {
    return <div className="timers">
        <Timers timers={timers} copyTimer={copyTimer} delTimer={delTimer} moveTimer={moveTimer} updateTimer={updateTimer} />
        <div className="buttonsPanel items-center">
            <div className="mainButtons">
                <FingerButton onClick={() => pageShow.state = PageName.LoadTimers}><LoadIcon /></FingerButton>
                <FingerButton onClick={() => pageShow.state = PageName.SaveTimers}><SaveIcon /></FingerButton>
                <FingerButton onClick={() => pageShow.state = PageName.AllImporter}><ImportIcon /></FingerButton>
                <FingerButton onClick={() => pageShow.state = PageName.AllExporter}><ExportIcon /></FingerButton>
            </div>
            <FingerButton className="addTimer" title="Add new timer" onClick={addTimer}><AddIcon /></FingerButton>
        </div>
    </div>
}
