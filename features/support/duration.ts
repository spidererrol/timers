
interface duration_parts {
    ms?: number,
    milliseconds?: number,
    s?: number,
    seconds?: number,
    m?: number,
    minutes?: number,
    h?: number,
    hours?: number,
}

export interface duration {
    ms: duration,
    milliseconds: duration,
    s: duration,
    seconds: duration,
    m: duration,
    minutes: duration,
    h: duration,
    hours: duration,
    Number: number,
}

const convert = { ms: 1, milliseconds: 1, s: 1000, seconds: 1000, m: 60000, minutes: 60000, h: 3600000, hours: 3600000 }

function isNumber(thing: duration_parts | number): thing is number {
    if ((thing as number).toFixed)
        return true
    return false
}

class base implements duration {
    protected _ms: number
    protected get convert(): number {
        return convert.ms
    }
    protected set(time: number) {
        this._ms = time * this.convert
    }
    constructor(time: duration_parts | number) {
        this._ms = 0
        if (isNumber(time)) {
            this.set(time)
            return
        }
        for (const unit in convert) {
            if (Object.prototype.hasOwnProperty.call(time, unit)) {
                const value = time[unit as keyof duration_parts]
                if (value !== undefined) {
                    this._ms += value * convert[unit as keyof typeof convert]
                }
            }
        }
    }
    get Number(): number {
        return this._ms / this.convert
    }
    get ms(): duration {
        return new duration_ms({ ms: this._ms })
    }
    get milliseconds(): duration {
        return new duration_ms({ ms: this._ms })
    }
    get s(): duration {
        return new duration_s({ ms: this._ms })
    }
    get seconds(): duration {
        return new duration_s({ ms: this._ms })
    }
    get m(): duration {
        return new duration_m({ ms: this._ms })
    }
    get minutes(): duration {
        return new duration_m({ ms: this._ms })
    }
    get h(): duration {
        return new duration_h({ ms: this._ms })
    }
    get hours(): duration {
        return new duration_h({ ms: this._ms })
    }
}

class duration_ms extends base {
    protected get convert(): number {
        return convert.ms
    }
}
export function ms(ms: number) {
    return new duration_ms(ms)
}

class duration_s extends base {
    protected get convert(): number {
        return convert.s
    }
}
export function s(s: number) {
    return new duration_s(s)
}

class duration_m extends base {
    protected get convert(): number {
        return convert.m
    }
}
export function m(m: number) {
    return new duration_m(m)
}

class duration_h extends base {
    protected get convert(): number {
        return convert.h
    }
}
export function h(h: number) {
    return new duration_h(h)
}
