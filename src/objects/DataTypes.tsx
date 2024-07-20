import TimerData from "./TimerData"

export interface TimersSaveData {
    timers: TimerData[],
    name: string,
    modified: number,
}

export type TimersSavesCollection = { [key: string]: TimersSaveData }

