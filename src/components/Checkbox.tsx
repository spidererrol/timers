import { tState } from "@/libs/State"
import { useId } from "react"

export function Checkbox({ label, checked }: { label: string; checked: tState }) {
    const cbid = useId()
    return <div className="LabeledCheckbox">
        <label htmlFor={cbid}>{label}</label>
        <input type="checkbox" id={cbid} defaultChecked={checked.state} onChange={e => checked.state = e.target.checked} />
    </div>
}
