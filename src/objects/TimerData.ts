import { padnumber } from "@/libs/helpers"

interface alpha_percent {
    percent: number
}
interface alpha_fraction {
    fraction: number
}
export class htmlcolor {
    hue: number
    saturation: number
    brightness: number
    private _alpha_percent?: number | undefined
    public get alpha_percent(): number | undefined {
        return this._alpha_percent
    }
    public get alpha_fraction(): number | undefined {
        if (this._alpha_percent === undefined) {
            return this._alpha_percent
        } else {
            return this._alpha_percent / 100
        }
    }
    public clear_alpha() {
        this._alpha_percent = undefined
    }
    public set alpha_percent(value: number) {
        this._alpha_percent = value
    }
    public set alpha_fraction(value: number) {
        this._alpha_percent = value * 100
    }

    constructor(hue: number, saturation: number, brightness: number, alpha?: alpha_percent | alpha_fraction) {
        this.hue = hue
        this.saturation = saturation
        this.brightness = brightness
        if (alpha) {
            if ((alpha as alpha_percent).percent !== undefined) {
                this.alpha_percent = (alpha as alpha_percent).percent
            } else if ((alpha as alpha_fraction).fraction !== undefined) {
                this.alpha_fraction = (alpha as alpha_fraction).fraction * 100
            } else {
                throw new Error("Out of Cheese!")
            }
        }
    }

    subtract(other: htmlcolor): htmlcolor {
        if (this._alpha_percent === undefined)
            return new htmlcolor(this.hue - other.hue, this.saturation - other.saturation, this.brightness - other.brightness)
        return new htmlcolor(this.hue - other.hue, this.saturation - other.saturation, this.brightness - other.brightness, { percent: (this.alpha_percent as number) - (other.alpha_percent as number) })
    }
    add(other: htmlcolor): htmlcolor {
        if (this._alpha_percent === undefined)
            return new htmlcolor(this.hue + other.hue, this.saturation + other.saturation, this.brightness + other.brightness)
        return new htmlcolor(this.hue + other.hue, this.saturation + other.saturation, this.brightness + other.brightness, { percent: (this.alpha_percent as number) + (other.alpha_percent as number) })
    }
    multiple_all(factor: number): htmlcolor {
        if (this._alpha_percent === undefined)
            return new htmlcolor(this.hue * factor, this.saturation * factor, this.brightness * factor)
        return new htmlcolor(this.hue * factor, this.saturation * factor, this.brightness * factor, { percent: (this.alpha_percent as number) * factor })
    }

    toString(): string {
        let ret = 'hsl(' + this.hue + " " + this.saturation + "% " + this.brightness + "%"
        if (this.alpha_percent !== undefined) {
            ret += " / " + this.alpha_percent + "%"
        }
        ret += ")"
        return ret
    }
}

export class timerduration {
    subtract(seconds: number): timerduration {
        return new timerduration(this.full_seconds - seconds)
    }
    private _seconds: number
    public get full_seconds(): number {
        return this._seconds
    }
    public set full_seconds(value: number) {
        this._seconds = value
    }

    public get seconds(): number {
        return this._seconds % 60
    }
    public set seconds(seconds: number) {
        const remove = this.seconds
        this._seconds -= remove
        this._seconds += seconds
    }
    public get minutes(): number {
        const secs = this._seconds - this.seconds
        return (secs / 60) % 60
    }
    public set minutes(minutes: number) {
        const remove = this.minutes * 60
        this._seconds -= remove
        this._seconds += minutes * 60
    }
    public get hours(): number {
        const secs = this._seconds - ((this.minutes * 60) + this.seconds)
        return secs / 3600
    }
    public set hours(hours: number) {
        const remove = this.hours * 3600
        this._seconds -= remove
        this._seconds += hours * 3600
    }
    public toDisplay(): string {
        if (this.hours > 0) {
            return [this.hours, padnumber(this.minutes), padnumber(this.seconds)].join(":")
        } else {
            return [this.minutes, padnumber(this.seconds)].join(":")
        }
    }

    constructor(seconds: number)
    constructor(minutes: number, seconds: number)
    constructor(hours: number, minutes: number, seconds: number)
    constructor(...parts: number[]) {
        if (parts.length < 0) {
            throw new Error("Not enough arguments to new timerduration()")
        } else if (parts.length > 3) {
            throw new Error("Too many arguments to new timerduration()")
        }
        this._seconds = 0
        if (parts.length > 0)
            this.seconds = parts.pop() as number
        if (parts.length > 0)
            this.minutes = parts.pop() as number
        if (parts.length > 0)
            this.seconds = parts.pop() as number
    }
}

export class TimerStageColorData {
    startpoint: timerduration
    endpoint: timerduration
    startcolor: htmlcolor
    endcolor: htmlcolor

    constructor(startpoint: timerduration, endpoint: timerduration, startcolor: htmlcolor, endcolor: htmlcolor) {
        this.startpoint = startpoint
        this.endpoint = endpoint
        this.startcolor = startcolor
        this.endcolor = endcolor
    }

    active(currenttime: timerduration): boolean {
        return this.startpoint.full_seconds <= currenttime.full_seconds && this.endpoint.full_seconds >= currenttime.full_seconds
    }

    current_color(currentpoint: timerduration): htmlcolor {
        const offsecs = Math.abs(currentpoint.full_seconds - this.startpoint.full_seconds)
        const rangesecs = Math.abs(this.endpoint.full_seconds - this.startpoint.full_seconds)
        const offs = offsecs / rangesecs
        const colrange = this.endcolor.subtract(this.startcolor)
        const newcoloffs = colrange.multiple_all(offs)
        return this.startcolor.add(newcoloffs)
    }
}

export class TimerStageData {
    duration: timerduration
    colors: TimerStageColorData[] = []

    constructor(duration: timerduration = new timerduration(300)) {
        this.duration = duration
    }

    current_color_stage(currentpoint: timerduration): TimerStageColorData | undefined {
        return this.colors.find(c => c.active(currentpoint))
    }
}

export default class TimerData {
    id: number
    configured: boolean = false
    private _starttime?: number
    private _pausetime?: number
    stages: TimerStageData[] = [new TimerStageData()]
    _currentstage: number = 0
    defaultcolor: htmlcolor = new htmlcolor(0, 0, 0)

    public clone(): TimerData {
        const ret = new TimerData(this.id)
        ret.configured = this.configured
        ret._starttime = this._starttime
        ret._pausetime = this._pausetime
        ret.stages = this.stages
        ret._currentstage = this._currentstage
        ret.defaultcolor = this.defaultcolor
        return ret
    }

    get color(): htmlcolor {
        const ccs = this.currentstage.current_color_stage(this.current)
        if (ccs === undefined)
            return this.defaultcolor
        return (ccs as TimerStageColorData).current_color(this.current)
    }
    get currentstage(): TimerStageData {
        return this.stages[this._currentstage]
    }
    get duration(): timerduration {
        return this.currentstage.duration
    }
    get started(): boolean {
        return this._starttime !== undefined
    }
    get paused(): boolean {
        return this._pausetime !== undefined
    }
    /**
     * Is timer currently counting down?
     * 
     * @deprecated Risk of confusion between this and `started`
     */
    get running(): boolean {
        return this.started && !this.paused
    }
    protected get _current(): timerduration {
        if (!this.started)
            return this.duration
        if (!this.paused)
            return this.duration.subtract((Date.now() - (this._starttime as number)) / 1000)
        return this.duration.subtract(((this._pausetime as number) - (this._starttime as number)) / 1000)
    }
    get current(): timerduration {
        const dur = this._current
        if (dur.full_seconds < 0) {
            return new timerduration(0)
        } else {
            return dur
        }
    }
    get finished(): boolean {
        return this.current.full_seconds <= 0
    }
    displayCurrent(): string {
        return this.current.toDisplay()
    }
    start() {
        if (!this.started) {
            this._starttime = Date.now()
            this._pausetime = undefined
        }
    }
    stop() {
        this._starttime = undefined
        this._pausetime = undefined
    }
    pause() {
        if (this.started && !this.paused) {
            this._pausetime = Date.now()
        }
    }
    resume() {
        if (this.paused) {
            (this._starttime as number) += Date.now() - (this._pausetime as number)
            this._pausetime = undefined
        }
    }
    reset() {
        this._starttime = Date.now()
        this._pausetime = undefined
    }

    constructor(id: number) {
        this.id = id
    }
}