import TimerData from "./TimerData"

export interface TimersSaveData {
    timers: TimerData[],
    name: string,
    modified: number,
    autosave?: boolean
}

export type TimersSavesCollection = { [key: string]: TimersSaveData }

