
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
        return new ms({ ms: this._ms })
    }
    get milliseconds(): duration {
        return new ms({ ms: this._ms })
    }
    get s(): duration {
        return new s({ ms: this._ms })
    }
    get seconds(): duration {
        return new s({ ms: this._ms })
    }
    get m(): duration {
        return new m({ ms: this._ms })
    }
    get minutes(): duration {
        return new m({ ms: this._ms })
    }
    get h(): duration {
        return new h({ ms: this._ms })
    }
    get hours(): duration {
        return new h({ ms: this._ms })
    }
}

export class ms extends base {
    protected get convert(): number {
        return convert.ms
    }
}

export class s extends base {
    protected get convert(): number {
        return convert.s
    }
}

export class m extends base {
    protected get convert(): number {
        return convert.m
    }
}

export class h extends base {
    protected get convert(): number {
        return convert.h
    }
}
