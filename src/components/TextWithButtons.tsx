import { ReactNode } from "react"

interface TextWithButtonsProps {
    text: string
    children: ReactNode
}

export default function TextWithButtons({ text, children: buttons }: TextWithButtonsProps ) {
    return <div className="TextWithButtons">
        <p>{text}</p>
        {buttons}
    </div>
}
