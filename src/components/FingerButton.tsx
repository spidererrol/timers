import { ReactNode } from "react"

export interface FingerButtonProps {
    className?: string
    onClick?: () => void
    title?: string
    children: ReactNode
}

const fingerSizeClass = "fingersize"

export default function FingerButton({ className, onClick, title, children }: FingerButtonProps) {
    const fullClassName = className === undefined ? fingerSizeClass : className + " " + fingerSizeClass + " flex items-center place-content-center"
    return (<button className={fullClassName} onClick={onClick} title={title}>{children}</button>)
}
