import { useDroppable } from "@dnd-kit/core"

export default function DropTarget({ position, dragging }: { position: number, dragging: boolean }) {
    const { isOver, setNodeRef } = useDroppable({
        id: "drop:" + position,
    })
    const classes = "DropTarget" + (isOver ? " hover" : "")
    if (dragging)
        return <fieldset className={classes} ref={setNodeRef}>
            <legend>-</legend>
        </fieldset>
    else
        return <></>
}

