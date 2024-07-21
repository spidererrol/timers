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

export function ifClass(test: boolean, className: string): string | undefined {
    return test ? className : undefined
}

type funcVal<T> = (() => T) | T

export function isFunction<T>(thing: funcVal<T>): thing is () => T {
    if (typeof thing === "function") {
        return true
    } else {
        return false
    }
}

export function resolveValue<T>(input: funcVal<T>): T {
    if (isFunction(input)) {
        return input()
    } else {
        return input
    }
}

export function condClasses(inClasses: { [key: string]: boolean }): string {
    const classList: string[] = []
    for (const inClass in inClasses) {
        const test = inClasses[inClass]
        if (resolveValue(test)) {
            classList.push(inClass)
        }
    }
    return classList.join(" ")
}