import { tState } from "@/libs/State"
import TimerData from "@/objects/TimerData"
import FingerButton from "@/components/FingerButton"
import { ImportIcon, ExportIcon, AddIcon } from "@/components/Icons"
import Timers from "@/components/Timers"

export function MainView({ timers, addTimer, delTimer, moveTimer, updateTimer, ShowExporter, ShowImporter }: { timers: TimerData[]; addTimer: () => void; delTimer: (id: number) => void; moveTimer: (from: number, to: number) => void; updateTimer: (id: number, update: (timer: TimerData) => void) => void; ShowExporter: tState; ShowImporter: tState }) {
    return <div className="timers">
        <Timers timers={timers} delTimer={delTimer} moveTimer={moveTimer} updateTimer={updateTimer} />
        <fieldset className="buttonsPanel items-center">
            <legend>-</legend>
            <div className="importExport">
                <FingerButton onClick={() => ShowImporter.toggle()}><ImportIcon /></FingerButton>
                <FingerButton onClick={() => ShowExporter.toggle()}><ExportIcon /></FingerButton>
            </div>
            <FingerButton className="addTimer" title="Add new timer" onClick={addTimer}><AddIcon /></FingerButton>
        </fieldset>
    </div>
}