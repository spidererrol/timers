import { myDateTimeFormatter } from "@/libs/myDateTimerFormatter"
import { useRef } from "react"
import FingerButton from "@/components/FingerButton"
import { ClipCopyIcon, SaveIcon } from "@/components/Icons"

export function Export({ exportText, fileprefix, post = () => { } }: { exportText: string; fileprefix: string; post?: (() => void) }) {
    const fileexportref = useRef<HTMLDivElement>(null)
    return <>
        <textarea onFocus={e => e.target.select()} value={exportText} readOnly />
        {navigator.clipboard !== undefined && navigator.clipboard.writeText !== undefined
            ? <FingerButton onClick={() => navigator.clipboard.writeText(exportText)}><ClipCopyIcon /></FingerButton>
            : <></>}
        <FingerButton onClick={() => {
            const blob = new Blob([exportText])
            const url = window.URL.createObjectURL(
                blob
            )
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${fileprefix}-${myDateTimeFormatter(new Date())}.json`)
            fileexportref.current?.appendChild(link)
            link.click()
            link.parentNode?.removeChild(link)
            post()
        }}><SaveIcon /></FingerButton>
        <div ref={fileexportref}></div>
    </>
}
