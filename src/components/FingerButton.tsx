import { MouseEventHandler, ReactNode } from "react"

export interface FingerButtonProps {
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    title?: string
    children: ReactNode
}

const defaultClasses = "fingersize flex items-center place-content-center"

export default function FingerButton({ className, onClick, title, children }: FingerButtonProps) {
    const fullClassName = className === undefined ? defaultClasses : className + " " + defaultClasses
    return (<button className={fullClassName} onClick={onClick} title={title}>{children}</button>)
}
