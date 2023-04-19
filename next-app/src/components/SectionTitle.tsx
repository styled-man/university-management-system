import { ReactNode } from "react"
import { Property } from "csstype"

interface SectionTitle {
    children: ReactNode
    color?: Property.Color
    textAlign?: Property.TextAlign
}

export default function SectionTitle({
    children,
    color = "black",
    textAlign = "center",
}: SectionTitle) {
    return (
        <h1 className="text-center font-bold text-2xl" style={{ color, textAlign }}>
            {children}
        </h1>
    )
}
