import TimerData from "@/objects/TimerData"

export function padnumber(num: number, len: number = 2): string {
    let ret = "" + num
    while (ret.length < len) {
        ret = "0" + ret
    }
    return ret
}

export type updateTimerFunction = (id: number, update: (timer: TimerData) => void) => void
