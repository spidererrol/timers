import { classConcat } from "@/libs/helpers"
import { MouseEventHandler, ReactNode } from "react"

interface TextIconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    text: string
    icon: ReactNode
    className?: string
}

export function TextIconButton({ onClick, text, icon, className }: TextIconButtonProps) {
    return <button className={classConcat("TextIconButton", className)} onClick={onClick}><p>{text}</p>{icon}</button>
}
