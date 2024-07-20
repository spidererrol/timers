import { loadData, saveData } from "@/libs/dataStorage"
import { State, tState } from "@/libs/State"
import { TimersSaveData, TimersSavesCollection } from "@/objects/DataTypes"
import TimerData from "@/objects/TimerData"
import GenericPage from "@/components/GenericPage"
import { ReactNode, useState } from "react"
import FingerButton from "@/components/FingerButton"
import { DeleteIcon, SaveIcon } from "@/components/Icons"
import TextWithButtons from "@/components/TextWithButtons"
import { myDateTimeFormatter } from "@/libs/myDateTimerFormatter"

export interface SaveTimersProps {
    timers: TimerData[]
    Show: tState
}

interface SaveEntryProps {
    saveName: string
    saveTo: (saveName: string, overwrite?: boolean) => void
    deleteSave: (name: string) => void
    saveInfo: TimersSaveData
}
function SaveEntry({ saveName, saveTo, deleteSave, saveInfo }: SaveEntryProps) {
    return <TextWithButtons key={saveName} text={saveName + " (" + myDateTimeFormatter(new Date(saveInfo.modified)) + ")"} >
        <FingerButton onClick={() => saveTo(saveName, true)}><SaveIcon /></FingerButton>
        <FingerButton onClick={() => deleteSave(saveName)}><DeleteIcon /></FingerButton>
    </TextWithButtons>
}

export default function SaveTimers({ timers, Show }: SaveTimersProps) {
    const saveAs = new State(useState(""))
    const saveSlots = loadData<TimersSavesCollection>("savedTimers", {})
    const existing: ReactNode[] = []

    function saveTo(name: string, overwrite: boolean = false) {
        if (overwrite || saveSlots[name] === undefined) {
            saveSlots[name] = {
                name: name,
                modified: Date.now(),
                timers
            }
            saveData("savedTimers", saveSlots)
        }
    }
    function deleteSave(name: string) {
        delete saveSlots[name]
        saveData("savedTimers", saveSlots)
    }

    for (const saveName in saveSlots) {
        const saveInfo = saveSlots[saveName]
        existing.push(<SaveEntry key={saveName} saveName={saveName} saveInfo={saveInfo} saveTo={saveTo} deleteSave={deleteSave} />)
    }
    return <GenericPage title="Save Timers" Show={Show}>
        <div className="input_button">
            <input type="text" onChange={e => saveAs.state = e.target.value} />
            <FingerButton className={saveAs.state.length > 0 && saveSlots[saveAs.state] === undefined ? undefined : "disabled"} onClick={() => saveTo(saveAs.state)}>
                <SaveIcon />
            </FingerButton>
        </div>
        <hr className="padded" />
        {existing.length > 0 ? existing : <p>No existing saves</p>}
        <hr className="padded" />
    </GenericPage>
}
