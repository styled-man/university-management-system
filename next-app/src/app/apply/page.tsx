"use client"

import Input from "@/components/Input"
import SectionTitle from "@/components/SectionTitle"
import SubmitButton from "@/components/SubmitButton"
import { useRouter } from "next/navigation"
import { FormEvent, useReducer } from "react"

interface Action {
    type:
        | "updateFirstName"
        | "updateLastName"
        | "updateEmail"
        | "updatePhoneNumber"
        | "updatePassword"
        | "updateConfirmPassword"
    payload: string
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
        switch (action.type) {
            case "updateFirstName":
                return { ...state, firstName: action.payload }
            case "updateLastName":
                return { ...state, lastName: action.payload }
            case "updateEmail":
                return { ...state, email: action.payload }
            case "updatePhoneNumber":
                return { ...state, phoneNumber: action.payload }
            case "updatePassword":
                return { ...state, password: action.payload }
            case "updateConfirmPassword":
                return { ...state, confirmPassword: action.payload }
        }
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
                <SectionTitle>Register</SectionTitle>

                <form className="w-[80vh] mt-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            placeholder="John"
                            value={userInput.firstName}
                            onChange={e =>
                                dispatch({ type: "updateFirstName", payload: e.target.value })
                            }
                        />
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            value={userInput.lastName}
                            onChange={e =>
                                dispatch({ type: "updateLastName", payload: e.target.value })
                            }
                        />
                        <Input
                            label="Email"
                            placeholder="someone@email.com"
                            value={userInput.email}
                            onChange={e =>
                                dispatch({ type: "updateEmail", payload: e.target.value })
                            }
                        />
                        <Input
                            label="Phone number"
                            placeholder="(000) 123-4567"
                            value={userInput.phoneNumber}
                            onChange={e =>
                                dispatch({ type: "updatePhoneNumber", payload: e.target.value })
                            }
                        />
                        <Input
                            label="Password"
                            placeholder="********"
                            value={userInput.password}
                            type="password"
                            onChange={e =>
                                dispatch({ type: "updatePassword", payload: e.target.value })
                            }
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="********"
                            value={userInput.confirmPassword}
                            type="password"
                            onChange={e =>
                                dispatch({ type: "updateConfirmPassword", payload: e.target.value })
                            }
                        />
                    </div>

                    <br className="mt-5" />
                    <SubmitButton>Register</SubmitButton>
                </form>
            </div>
        </main>
    )
}
