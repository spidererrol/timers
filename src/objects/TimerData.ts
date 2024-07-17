import { padnumber } from "@/libs/helpers"

interface alpha_percent {
    percent: number
}
interface alpha_fraction {
    fraction: number
}
export class htmlcolour {
    hue: number
    saturation: number
    brightness: number
    private _alpha_percent?: number | undefined
    public clone() {
        return new htmlcolour(this.hue, this.saturation, this.brightness, this._alpha_percent === undefined ? undefined : { percent: this._alpha_percent })
    }
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
    invert() {
        return new htmlcolour(360 - this.hue, 100 - this.saturation, 100 - this.brightness)
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

    subtract(other: htmlcolour): htmlcolour {
        if (this._alpha_percent === undefined)
            return new htmlcolour(this.hue - other.hue, this.saturation - other.saturation, this.brightness - other.brightness)
        return new htmlcolour(this.hue - other.hue, this.saturation - other.saturation, this.brightness - other.brightness, { percent: (this.alpha_percent as number) - (other.alpha_percent as number) })
    }
    add(other: htmlcolour): htmlcolour {
        if (this._alpha_percent === undefined)
            return new htmlcolour(this.hue + other.hue, this.saturation + other.saturation, this.brightness + other.brightness)
        return new htmlcolour(this.hue + other.hue, this.saturation + other.saturation, this.brightness + other.brightness, { percent: (this.alpha_percent as number) + (other.alpha_percent as number) })
    }
    multiple_all(factor: number): htmlcolour {
        if (this._alpha_percent === undefined)
            return new htmlcolour(this.hue * factor, this.saturation * factor, this.brightness * factor)
        return new htmlcolour(this.hue * factor, this.saturation * factor, this.brightness * factor, { percent: (this.alpha_percent as number) * factor })
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

    public clone() {
        return new timerduration(this._seconds)
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
    startcolor: htmlcolour
    endcolor: htmlcolour

    constructor(startpoint: timerduration, endpoint: timerduration, startcolor: htmlcolour, endcolor: htmlcolour) {
        if (endpoint.full_seconds > startpoint.full_seconds) {
            const temppoint = startpoint
            startpoint = endpoint
            endpoint = temppoint
            const tempcolor = startcolor
            startcolor = endcolor
            endcolor = tempcolor
        }
        this.startpoint = startpoint
        this.endpoint = endpoint
        this.startcolor = startcolor
        this.endcolor = endcolor
    }

    active(currenttime: timerduration): boolean {
        return this.startpoint.full_seconds >= currenttime.full_seconds && this.endpoint.full_seconds <= currenttime.full_seconds
    }

    current_color(currentpoint: timerduration): htmlcolour {
        const offsecs = Math.abs(currentpoint.full_seconds - this.startpoint.full_seconds)
        const rangesecs = Math.abs(this.endpoint.full_seconds - this.startpoint.full_seconds)
        const offs = offsecs / rangesecs
        const colrange = this.endcolor.subtract(this.startcolor)
        const newcoloffs = colrange.multiple_all(offs)
        return this.startcolor.add(newcoloffs)
    }
}

export enum AlarmState {
    Pending,
    Active,
    Finished,
}

export class TimerStageData {
    duration: timerduration
    colors: TimerStageColorData[] = []
    alarm: AlarmState = AlarmState.Pending

    constructor(duration: timerduration = new timerduration(300)) {
        this.duration = duration
    }

    current_color_stage(currentpoint: timerduration): TimerStageColorData | undefined {
        return this.colors.find(c => c.active(currentpoint))
    }

    addColour() {
        const last = this.colors.at(-1)
        const lastpos = last !== undefined ? last.endpoint.clone() : this.duration.clone()
        const lastcol = last !== undefined ? last.endcolor.clone() : new htmlcolour(0, 0, 0)
        //TODO: It would be nice to populate default startcolour and endcolour from TimerData.defaultcolor and TimerData.finishedcolor!
        this.colors.push(new TimerStageColorData(lastpos, new timerduration(0), lastcol, new htmlcolour(0, 100, 50)))
    }
    delColour(n?: number) {
        if (n === undefined || n >= this.colors.length)
            n = this.colors.length - 1
        this.colors.splice(n, 1)
    }

}

export default class TimerData {
    id: number
    name: string = "Timer"
    configured: boolean = false
    private _starttime?: number
    private _pausetime?: number
    stages: TimerStageData[] = [new TimerStageData()]
    _currentstage: number = 0
    defaultcolor: htmlcolour = new htmlcolour(0, 0, 0)
    finishedcolor: htmlcolour = new htmlcolour(0, 100, 50)
    protected _finishedflag: boolean = false

    addStage() {
        this.stages.push(new TimerStageData())
    }
    delStage(n?: number) {
        if (n === undefined || n >= this.stages.length)
            n = this.stages.length - 1
        this.stages.splice(n, 1)
    }

    public clone(): TimerData {
        const ret = new TimerData(this.id)
        ret.configured = this.configured
        ret._starttime = this._starttime
        ret._pausetime = this._pausetime
        ret.stages = this.stages
        ret._currentstage = this._currentstage
        ret.defaultcolor = this.defaultcolor
        ret.finishedcolor = this.finishedcolor
        return ret
    }

    alarmActive(): boolean {
        return this.stages.map(s => s.alarm == AlarmState.Active).reduce((p, c) => p || c)
    }
    resetAlarms() {
        this.stages.forEach(s => s.alarm = AlarmState.Pending)
    }
    stopAlarms() {
        this.stages.filter(s => s.alarm == AlarmState.Active).forEach(s => s.alarm = AlarmState.Finished)
    }

    tick() {
        if (this._finished() && this._running()) {
            if (this.currentstage.alarm == AlarmState.Pending)
                this.currentstage.alarm = AlarmState.Active
            if (this._currentstage < (this.stages.length - 1)) {
                this._currentstage++
                this.currentstage.alarm = AlarmState.Pending
                // this._starttime = Date.now() // I partly think it would be nicer to track
            } else {
                this._stop()
                this._finishedflag = true
            }
        }
    }

    get color(): htmlcolour {
        if (this.finished)
            return this.finishedcolor
        const ccs = this.currentstage.current_color_stage(this.current)
        if (ccs === undefined)
            return this.defaultcolor
        return (ccs as TimerStageColorData).current_color(this.current)
    }
    get currentstage(): TimerStageData {
        return this.stages[this._currentstage]
    }
    get nextstage(): TimerStageData | undefined {
        return this.stages[this._currentstage + 1]
    }
    get duration(): timerduration {
        return this.currentstage.duration
    }
    protected _started(): boolean {
        return this._starttime !== undefined
    }
    get started(): boolean {
        this.tick()
        return this._started()
    }
    protected _paused(): boolean {
        return this._pausetime !== undefined
    }
    get paused(): boolean {
        this.tick()
        return this._paused()
    }
    /**
     * Is timer currently counting down?
     * 
     * @deprecated Risk of confusion between this and `started`
     */
    get running(): boolean {
        return this._running()
    }
    protected _running(): boolean {
        return this._started() && !this._paused()
    }
    get stagestartedtime(): number | undefined {
        if (this._starttime == undefined)
            return undefined
        if (this._currentstage == 0)
            return this._starttime
        return this._starttime + (this.stages.slice(0, this._currentstage).map(s => s.duration.full_seconds).reduce((p, c) => p + c, 0) * 1000)
    }
    protected get _current(): timerduration {
        if (this._finishedflag)
            return new timerduration(0)
        if (!this._started())
            return this.duration
        if (!this._paused())
            return this.duration.subtract((Date.now() - (this.stagestartedtime as number)) / 1000)
        return this.duration.subtract(((this._pausetime as number) - (this.stagestartedtime as number)) / 1000)
    }
    get current(): timerduration {
        const dur = this._current
        if (dur.full_seconds < 0) {
            return new timerduration(0)
        } else {
            return dur
        }
    }
    protected _finished(): boolean {
        return (this._finishedflag || this.current.full_seconds <= 0)

    }
    get finished(): boolean {
        this.tick()
        return this._finished()
    }
    displayCurrent(): string {
        this.tick()
        return this.current.toDisplay()
    }
    start() {
        if (this.finished || !this.started) {
            this._starttime = Date.now()
            this._pausetime = undefined
            this._finishedflag = false
            this._currentstage = 0
            this.resetAlarms()
        }
    }
    protected _stop() {
        this._starttime = undefined
        this._pausetime = undefined
    }
    stop() {
        this._stop()
        this._finishedflag = false
        this._currentstage = 0
        this.resetAlarms()
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
        this._finishedflag = false
        this.resetAlarms()
    }

    constructor(id: number) {
        this.id = id
    }
}