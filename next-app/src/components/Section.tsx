import { ReactNode, useState } from "react"
import { BsArrowDownSquare } from "react-icons/bs"

interface Section {
    title: string
    children: ReactNode
}

export default function Section({ title, children }: Section) {
    const [isExpanded, setExpanded] = useState(false)

    return (
        <section
            className={`${
                isExpanded ? "p-10" : "p-5"
            } bg-white rounded-md shadow w-full group transition-all duration-500`}
        >
            <span className="flex items-center justify-start gap-4">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <button className="cursor-pointer" onClick={() => setExpanded(!isExpanded)}>
                    <BsArrowDownSquare
                        className={`${
                            isExpanded
                                ? "-rotate-90 active:-translate-x-1"
                                : "rotate-0 active:translate-y-1"
                        } transition-[transform] duration-150 ease-in-out hidden group-hover:block`}
                    />
                </button>
            </span>
            <div
                className={`${
                    isExpanded ? "max-h-[100vh]" : "max-h-0"
                } overflow-hidden transition-[max-height] duration-300 ease-in-out`}
            >
                {children}
            </div>
        </section>
    )
}
