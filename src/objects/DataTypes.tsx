import TimerData from "./TimerData"

export interface TimersSaveData {
    timers: TimerData[],
    name: string,
    modified: number,
    autosave?: boolean
}

export type TimersSavesCollection = { [key: string]: TimersSaveData }

export interface importExportData {
    timers?: TimerData[],
    saves?: TimersSavesCollection
}

export type importTimersFunc = (json: string | importExportData, replace: boolean) => void