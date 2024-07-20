import TimerData, { htmlcolour } from "@/objects/TimerData"

export function padnumber(num: number, len: number = 2): string {
    let ret = "" + Math.floor(num)
    while (ret.length < len) {
        ret = "0" + ret
    }
    return ret
}

export type updateTimerFunction = (id: number, update: (timer: TimerData) => void) => void
export type colourUpdater = (uc: (c: htmlcolour) => void) => void
export type partUpdater = (n: number) => void

export function classConcat(...names: (string | undefined)[]) {
    return names.filter(n => n !== undefined).join(" ")
}
