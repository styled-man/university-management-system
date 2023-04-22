"use client"

import Input from "@/components/Input"
import Loading from "@/components/Loading"
import SubmitButton from "@/components/SubmitButton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Login() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setLoading(true)

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            setError(response.statusText)
            setLoading(false)
            return
        }

        router.push("/dashboard")
    }

    return (
        <>
            <Loading show={isLoading} />

            <main className="flex items-center flex-col justify-center">
                <div className="bg-white mt-[10vh] p-10 shadow rounded-md">
                    <h1 className="text-center font-bold text-2xl mb-5">Login</h1>

                    <form className="flex items-center justify-center flex-col gap-8 w-[30vw]" onSubmit={handleSubmit}>
                        <Input label="Email" placeholder="someone@email.com" onChange={e => setEmail(e.target.value)} />
                        <Input
                            label="Password"
                            placeholder="*********"
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />

                        <SubmitButton>Login</SubmitButton>
                    </form>

                    <h3 className="text-red-600 text-center capitalize">{error}</h3>

                    <hr className="my-6" />

                    <div className="text-center w-full">
                        <Link href="/apply">Start your application today?</Link>
                    </div>
                </div>
            </main>
        </>
    )
}
