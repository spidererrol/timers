import Image from "next/image"
import DeleteFile from "famfamfam-silk/dist/png/delete.png"
import AddFile from "famfamfam-silk/dist/png/add.png"
import DoneFile from "famfamfam-silk/dist/png/accept.png"
import IncFile from "famfamfam-silk/dist/png/arrow_up.png"
import DecFile from "famfamfam-silk/dist/png/arrow_down.png"
import EditFile from "famfamfam-silk/dist/png/note_edit.png"

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

export function IncIcon({alt="Increase",title}:IconParams) {
    return <Image className="icon" alt={alt} title={title} src={IncFile} />
}

export function DecIcon({alt="Decrease",title}:IconParams) {
    return <Image className="icon" alt={alt} title={title} src={DecFile} />
}

export function EditIcon({alt="Edit",title}:IconParams) {
    return <Image className="icon" alt={alt} title={title} src={EditFile} />
}
