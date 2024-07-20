import { Dispatch, SetStateAction } from "react"

export class State<T> {
    protected getState: T
    protected setState: Dispatch<SetStateAction<T>>
    public get state(): T {
        return this.getState
    }
    public set state(value: T) {
        this.setState(value)
    }

    constructor([getState, setState]: [getState: T, setState: Dispatch<SetStateAction<T>>]) {
        this.getState = getState
        this.setState = setState
    }
}
export class StateDefault<T> extends State<T> {
    protected _default: T
    public static upgrade<T>(old: State<T>, defaultValue: T): StateDefault<T> {
        return new StateDefault([(old as StateDefault<T>).getState, (old as StateDefault<T>).setState], defaultValue)
    }
    constructor(getSet: [getState: T, setState: Dispatch<SetStateAction<T>>], defaultValue: T) {
        super(getSet)
        this._default = defaultValue
    }
    public setDefault() {
        this.setState(this._default)
    }
    public tState(boolmode: T): tState {
        function resolve(input: boolean | ((prev: boolean) => boolean), prev: boolean): boolean {
            if (typeof input === "function") {
                return input(prev)
            } else {
                return input
            }
        }
        return new tState([this.state == boolmode, (bool: SetStateAction<boolean>) => { resolve(bool, this.state == boolmode) ? this.setState(boolmode) : this.setDefault() }])
    }
}
export class tState extends State<boolean> {
    public toggle() {
        this.state = !this.state
    }
}
