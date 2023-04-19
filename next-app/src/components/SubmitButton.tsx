import { ReactNode } from "react"

interface SubmitButton {
    children: ReactNode
}

export default function Button({ children }: SubmitButton) {
    return (
        <button
            className="bg-black text-white w-full text-center py-2 rounded-md my-4"
            type="submit"
        >
            {children}
        </button>
    )
}
