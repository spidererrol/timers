import { State, StateDefault } from "@/libs/State"
import { AllExporter } from "./AllExporter"
import { AllImporter } from "./AllImporter"
import { MainView } from "./MainView"
import TimerData from "@/objects/TimerData"

export enum PageName {
    MainView,
    AllExporter,
    AllImporter,
    SaveTimers,
    LoadTimers,
}

interface PageProps {
    pagename: StateDefault<PageName>
    timers: TimerData[]
    importTimers: (json: string) => void
    moveTimer: (from: number, to: number) => void
    addTimer: () => void
    copyTimer: (id: number) => void
    delTimer: (id: number) => void
    updateTimer: (id: number, update: (timer: TimerData) => void) => void
}

export default function PageSelector({ pagename, timers, importTimers, moveTimer, addTimer, copyTimer, delTimer, updateTimer }: PageProps) {
    switch (pagename.state) {
        case PageName.MainView:
            return <MainView timers={timers} moveTimer={moveTimer} addTimer={addTimer} copyTimer={copyTimer} delTimer={delTimer} updateTimer={updateTimer} pageShow={pagename} />
        case PageName.AllExporter:
            return <AllExporter timers={timers} Show={pagename.tState(PageName.AllExporter)} />
        case PageName.AllImporter:
            return <AllImporter timers={timers} Show={pagename.tState(PageName.AllImporter)} importTimers={importTimers} />
        default:
            return <div className="not-implemented" onClick={()=>pagename.setDefault()}><p>Not yet implemented</p></div>
    }
}