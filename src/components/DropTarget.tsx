import { useDroppable } from "@dnd-kit/core"

interface DropTargetProps {
    position: number
    dragging: boolean
    prefix: string
}

export default function DropTarget({ position, dragging, prefix }: DropTargetProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: prefix + ":" + position,
    })
    const classes = "DropTarget" + (isOver ? " hover" : "")
    if (dragging)
        return <fieldset className={classes} ref={setNodeRef}>
            <legend>-</legend>
        </fieldset>
    else
        return <></>
}

