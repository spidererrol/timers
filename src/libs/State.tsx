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
export class tState extends State<boolean> {
    public toggle() {
        this.state = !this.state
    }
}
