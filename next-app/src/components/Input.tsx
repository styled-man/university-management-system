import { ChangeEvent } from "react"

interface Input {
    label: string
    placeholder: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string
    type?: "text" | "password"
}

export default function Input({ onChange, label, placeholder, value, type = "text" }: Input) {
    return (
        <div>
            <label htmlFor={label + placeholder} className="block mb-2 font-bold text-sm">
                {label}
            </label>
            <input
                type={type}
                id={label + placeholder}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="shadow appearance-none border rounded-md w-full py-2 px-3 focus:outline-none"
            />
        </div>
    )
}
