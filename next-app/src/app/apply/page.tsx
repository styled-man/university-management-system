"use client"

import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useReducer } from "react"

interface Action {
    payload: Partial<typeof initialState>
}

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
}

export default function Apply() {
    const router = useRouter()

    const [userInput, dispatch] = useReducer(onUserInputChange, initialState)

    function onUserInputChange(state: typeof initialState, action: Action): typeof initialState {
        return { ...state, ...action.payload }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        for (const [key, value] of Object.entries(userInput)) {
            if (!value) {
                alert(`${key} cannot be empty`)
                return
            }
        }

        router.push("/profile")
    }

    return (
        <main className="flex items-center flex-col justify-center">
            <div className="bg-white mt-[10vh] p-10 shadow rounded-md">
                <h1 className="text-center font-bold text-2xl mb-5">Register</h1>

                <form className="w-[80vh] mt-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            placeholder="John"
                            value={userInput.firstName}
                            onChange={e => dispatch({ payload: { firstName: e.target.value } })}
                        />
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            value={userInput.lastName}
                            onChange={e => dispatch({ payload: { lastName: e.target.value } })}
                        />
                        <Input
                            label="Email"
                            placeholder="someone@email.com"
                            value={userInput.email}
                            onChange={e => dispatch({ payload: { email: e.target.value } })}
                        />
                        <Input
                            label="Phone number"
                            placeholder="(000) 123-4567"
                            value={userInput.phoneNumber}
                            onChange={e => dispatch({ payload: { phoneNumber: e.target.value } })}
                        />
                        <Input
                            label="Password"
                            placeholder="********"
                            value={userInput.password}
                            type="password"
                            onChange={e => dispatch({ payload: { password: e.target.value } })}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="********"
                            value={userInput.confirmPassword}
                            type="password"
                            onChange={e => dispatch({ payload: { confirmPassword: e.target.value } })}
                        />
                    </div>

                    <br className="mt-5" />
                    <SubmitButton>Register</SubmitButton>
                </form>
            </div>
        </main>
    )
}
