import { tState } from "@/libs/State"
import { ReactNode } from "react"
import FingerButton from "@/components/FingerButton"
import { CancelIcon } from "@/components/Icons"

interface GenericPageProps {
    Show: tState
    children: ReactNode
    className?: string
    extraButtons?: ReactNode
    title: string
}

export default function GenericPage({ title, Show, children, className, extraButtons = <></> }: GenericPageProps) {
    return <fieldset className={"GenericPage " + (className ?? title.replaceAll(/\s+/g, ""))}>
        <legend>{title}</legend>
        {children}
        <div className="toolbar">
            {extraButtons}
            <FingerButton onClick={() => Show.toggle()}><CancelIcon /></FingerButton>
        </div>
    </fieldset>
}
