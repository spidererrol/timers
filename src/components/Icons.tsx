import Image from "next/image"
import "@/components/Icons.css"
import DeleteFile from "famfamfam-silk/dist/png/delete.png"
import AddFile from "famfamfam-silk/dist/png/add.png"
import DoneFile from "famfamfam-silk/dist/png/accept.png"
import IncFile from "famfamfam-silk/dist/png/arrow_up.png"
import DecFile from "famfamfam-silk/dist/png/arrow_down.png"
import EditFile from "famfamfam-silk/dist/png/pencil.png"
import ColourWheelFile from "famfamfam-silk/dist/png/color_wheel.png"
import ClockFile from "famfamfam-silk/dist/png/clock.png"
import { timerduration } from "@/objects/TimerData"

export interface IconParams {
    alt?: string
    title?: string
}

export function DeleteIcon({ alt = "X", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={DeleteFile} />
}

export function AddIcon({ alt = "+", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={AddFile} />
}

export function DoneIcon({ alt = "Done", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={DoneFile} />
}

export function IncIcon({ alt = "Increase", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={IncFile} />
}

export function DecIcon({ alt = "Decrease", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={DecFile} />
}

export function EditIcon({ alt = "Edit", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={EditFile} />
}

export function ColourWheelIcon({ alt = "Colors", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={ColourWheelFile} />
}

export function ClockIcon({ alt = "Times", title, duration }: IconParams & { duration?: timerduration }) {
    if (duration === undefined)
        return <Image className="icon" alt={alt} title={title} src={ClockFile} />
    return <span className="durationicon">{duration.toDisplay()}</span>
}

function MdiFont({ item, type = "outlined", alt, title }: { item: string; type?: string, alt?: string, title?: string }) {
    let mdiclass = "material-icons"
    if (type !== undefined && type != "")
        mdiclass += "-" + type
    return <span className={"icon mdi " + mdiclass} title={title}>{item}</span>
}

export function PlayIcon({ alt = "Play", title }: IconParams) {
    return <MdiFont item="play_circle" alt={alt} title={title} />
}

export function PauseIcon({ alt = "Pause", title }: IconParams) {
    return <MdiFont item="pause_circle" alt={alt} title={title} />
}

export function StopIcon({ alt = "Stop", title }: IconParams) {
    return <MdiFont item="stop_circle" alt={alt} title={title} />
}