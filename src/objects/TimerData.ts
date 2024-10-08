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

    static restore(o: htmlcolour): htmlcolour {
        const c = new htmlcolour(o.hue, o.saturation, o.brightness)
        c._alpha_percent = o._alpha_percent
        return c
    }

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

    // hsl(): [number, number, number, alpha_percent | undefined] {
    //     const alphaobj = this._alpha_percent === undefined ? undefined : { percent: this._alpha_percent }
    //     return [this.hue, this.saturation, this.brightness, alphaobj]
    // }
}

export class timerduration {
    private _seconds: number

    static restore(o: timerduration): timerduration {
        return new timerduration(o._seconds)
    }
    subtract(seconds: number): timerduration {
        return new timerduration(this.full_seconds - seconds)
    }
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

    static restore(o: TimerStageColorData): TimerStageColorData {
        const t = new TimerStageColorData(timerduration.restore(o.startpoint), timerduration.restore(o.endpoint), htmlcolour.restore(o.startcolor), htmlcolour.restore(o.endcolor))
        return t
    }

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
    pause: boolean = false
    private _colors: TimerStageColorData[] = []
    public get colors(): TimerStageColorData[] {
        return this._colors // Don't sort here, it will confuse which item(s) I am editing!
    }
    public set colors(value: TimerStageColorData[]) {
        this._colors = value.sort((a, b) => b.startpoint.full_seconds - a.startpoint.full_seconds)
    }
    alarm: AlarmState = AlarmState.Pending

    static restore(o: TimerStageData): TimerStageData {
        const t = new TimerStageData(timerduration.restore(o.duration))
        t.colors = o._colors.map(oc => TimerStageColorData.restore(oc))
        t.alarm = o.alarm
        t.pause = o.pause ?? false
        return t
    }

    constructor(duration: timerduration = new timerduration(300)) {
        this.duration = duration
    }

    sortColours() {
        this._colors.sort((a, b) => b.startpoint.full_seconds - a.startpoint.full_seconds)
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
    minimised: boolean = false

    /**
     * Create a TimerData object from TimerData data.
     * 
     * @param o Settings in TimerData format.
     * @param [resume=false] Resume the timer.
     * @returns a full TimerData object
     */
    static restore(o: TimerData, resume: boolean = false): TimerData {
        const t = new TimerData(o.id)
        t.name = o.name
        t.configured = o.configured
        t.stages = o.stages.map(os => TimerStageData.restore(os))
        t.defaultcolor = htmlcolour.restore(o.defaultcolor)
        t.finishedcolor = htmlcolour.restore(o.finishedcolor)
        t.minimised = o.minimised ?? false

        if (resume) {
            // These will restore the active state of the timer:
            t._starttime = o._starttime
            t._pausetime = o._pausetime
            t._currentstage = o._currentstage
            t._finishedflag = o._finishedflag
        }
        return t
    }

    addStage() {
        this.stages.push(new TimerStageData())
    }
    delStage(n?: number) {
        if (n === undefined || n >= this.stages.length)
            n = this.stages.length - 1
        this.stages.splice(n, 1)
    }

    /**
     * Duplicate this timer to a new copy.
     */
    public clone(newId: number, nameExists?: (name: string) => boolean): TimerData {
        const newTimer = TimerData.restore(this)
        newTimer.id = newId
        if (this.name.match(/\d$/)) {
            newTimer.name = this.name.replace(/(\d+)$/, (_s, a) => "" + (Number.parseInt(a) + 1))
            if (nameExists !== undefined) {
                const match = this.name.match(/(\d+)$/)
                if (match !== null) {
                    const basename = this.name.replace(/\d+$/, "")
                    let i = Number.parseInt(match[1])
                    while (nameExists(basename + i)) {
                        i++
                    }
                    newTimer.name = basename + i
                }
            }
        } else {
            newTimer.name = this.name + " 2"
        }
        return newTimer
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
            if (this.currentstage.alarm == AlarmState.Pending) {
                this.currentstage.alarm = AlarmState.Active
            }
            if (this._currentstage < (this.stages.length - 1)) {
                if (this.currentstage.pause && this._pausetime === undefined)
                    this._pausetime = Date.now()
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
        return this // Used when copying
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
        this._currentstage = 0
        this.resetAlarms()
    }

    constructor(id: number, name?: string) {
        this.id = id
        if (name)
            this.name = name
    }
}