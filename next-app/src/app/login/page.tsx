"use client"

import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import Link from "next/link"
import { FormEvent, useState } from "react"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        alert(`email: ${email}\npassword: ${password}`)
    }

    return (
        <main className="flex items-center flex-col justify-center">
            <div className="bg-white mt-[10vh] p-10 shadow rounded-md">
                <h1 className="text-center font-bold text-2xl mb-5">Login</h1>

                <form className="w-[40vh] max-w-xs" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            label="Email"
                            placeholder="someone@email.com"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label="Password"
                            placeholder="*********"
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>

                    <SubmitButton>Login</SubmitButton>
                </form>

                <hr className="my-6" />

                <div className="text-center w-full">
                    <Link href="/apply">Start your application today?</Link>
                </div>
            </div>
        </main>
    )
}
