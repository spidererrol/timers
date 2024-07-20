import { tState } from "@/libs/State"
import { ReactNode } from "react"
import FingerButton from "./FingerButton"
import { CancelIcon } from "./Icons"

interface GenericPageProps {
    Show: tState
    children: ReactNode
    className?: string
    extraButtons?: ReactNode
}

export default function GenericPage({ Show, children, className, extraButtons = <></> }: GenericPageProps ) {
    return <div className={className}>
        {children}
        <div className="toolbar">
            {extraButtons}
            <FingerButton onClick={() => Show.toggle()}><CancelIcon /></FingerButton>
        </div>
    </div>
}
