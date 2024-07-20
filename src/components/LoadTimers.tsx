import { loadData, saveData } from "@/libs/dataStorage"
import { State, tState } from "@/libs/State"
import { TimersSaveData, TimersSavesCollection } from "@/objects/DataTypes"
import TimerData from "@/objects/TimerData"
import GenericPage from "@/components/GenericPage"
import { ReactNode, useState } from "react"
import FingerButton from "@/components/FingerButton"
import { DeleteIcon, LoadIcon, SaveIcon } from "@/components/Icons"
import TextWithButtons from "@/components/TextWithButtons"
import { myDateTimeFormatter } from "@/libs/myDateTimerFormatter"

export interface SaveTimersProps {
    timers: TimerData[]
    Show: tState
    importTimers: (saveTimers: string | TimerData[]) => void
}

interface SaveEntryProps {
    saveName: string
    loadFrom: (saveName: string) => void
    deleteSave: (name: string) => void
    saveInfo: TimersSaveData
}
function SaveEntry({ saveName, loadFrom, deleteSave, saveInfo }: SaveEntryProps) {
    return <TextWithButtons key={saveName} text={saveName + " (" + myDateTimeFormatter(new Date(saveInfo.modified)) + ")"} >
        <FingerButton onClick={() => loadFrom(saveName)}><LoadIcon /></FingerButton>
        <FingerButton onClick={() => deleteSave(saveName)}><DeleteIcon /></FingerButton>
    </TextWithButtons>
}

export default function LoadTimers({ Show, importTimers }: SaveTimersProps) {
    const saveSlots = loadData<TimersSavesCollection>("savedTimers", {})
    const existing: ReactNode[] = []

    function loadFrom(name: string) {
        importTimers(saveSlots[name]?.timers ?? {})
    }

    function deleteSave(name: string) {
        delete saveSlots[name]
        saveData("savedTimers", saveSlots)
    }

    for (const saveName in saveSlots) {
        const saveInfo = saveSlots[saveName]
        existing.push(<SaveEntry key={saveName} saveName={saveName} saveInfo={saveInfo} loadFrom={(name) => { loadFrom(name); Show.state = false }} deleteSave={deleteSave} />)
    }
    return <GenericPage title="Load Timers" Show={Show}>
        {existing.length > 0 ? existing : <p>No existing saves</p>}
        <hr className="padded" />
    </GenericPage>
}
