import Image from "next/image"
import { timerduration } from "@/objects/TimerData"
import { padnumber } from "@/libs/helpers"
import "@/components/Icons.css"
import DeleteFile from "famfamfam-silk/dist/png/delete.png"
import AddFile from "famfamfam-silk/dist/png/add.png"
import DoneFile from "famfamfam-silk/dist/png/accept.png"
import CancelFile from "famfamfam-silk/dist/png/cancel.png"
import IncFile from "famfamfam-silk/dist/png/arrow_up.png"
import DecFile from "famfamfam-silk/dist/png/arrow_down.png"
import EditFile from "famfamfam-silk/dist/png/pencil.png"
import ColourWheelFile from "famfamfam-silk/dist/png/color_wheel.png"
import ClockFile from "famfamfam-silk/dist/png/clock.png"
import ImportFile from "famfamfam-silk/dist/png/page_go.png"
import ExportFile from "famfamfam-silk/dist/png/page_save.png"
import SaveFile from "famfamfam-silk/dist/png/disk.png"
import LoadFile from "famfamfam-silk/dist/png/folder.png"

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

export function CancelIcon({ alt = "Cancel", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={CancelFile} />
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

export function SecondsIcon({ alt = "Seconds", title, duration }: IconParams & { duration: timerduration }) {
    return <span className="durationicon">{padnumber(Math.floor(duration.full_seconds), 3)}</span>
}

export function ImportIcon({ alt = "Import", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={ImportFile} />
}

export function ExportIcon({ alt = "Import", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={ExportFile} />
}

export function SaveIcon({ alt = "Save", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={SaveFile} />
}

export function LoadIcon({ alt = "Load", title }: IconParams) {
    return <Image className="icon" alt={alt} title={title} src={LoadFile} />
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

export function RestartIcon({ alt = "Restart", title }: IconParams) {
    return <MdiFont item="restart_alt" alt={alt} title={title} /> // Oddly there is no "restart" icon.
}

export function AlarmMuteIcon({ alt = "Alarm Mute", title }: IconParams) {
    return <MdiFont item="notifications_active" alt={alt} title={title} />
}

export function ClipCopyIcon({ alt = "Copy to Clipboard", title }: IconParams) {
    return <MdiFont item="content_paste_go" alt={alt} title={title} />
}

export function ClipPasteIcon({ alt = "Paste from Clipboard", title }: IconParams) {
    return <MdiFont item="content_paste" alt={alt} title={title} />
}

export function CopyIcon({ alt = "Copy", title }: IconParams) {
    return <MdiFont item="content_copy" alt={alt} title={title} />
}
