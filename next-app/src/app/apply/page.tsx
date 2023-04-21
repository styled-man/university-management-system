"use client"

import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { INITIAL_STATE, userDataReducer } from "@/utils/reducers/userData"
import { useRouter } from "next/navigation"
import { FormEvent, useReducer } from "react"

export default function Apply() {
    const router = useRouter()

    const [userInput, dispatch] = useReducer(userDataReducer, INITIAL_STATE)

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
                            value={userInput.personalInfo?.firstName}
                            onChange={e =>
                                dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { firstName: e.target.value } })
                            }
                        />
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            value={userInput.personalInfo?.lastName}
                            onChange={e =>
                                dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { lastName: e.target.value } })
                            }
                        />
                        <Input
                            label="Email"
                            placeholder="someone@email.com"
                            value={userInput.personalInfo?.email}
                            onChange={e =>
                                dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { email: e.target.value } })
                            }
                        />
                        <Input
                            label="Phone number"
                            placeholder="(000) 123-4567"
                            value={userInput.personalInfo?.phoneNumber}
                            onChange={e =>
                                dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { phoneNumber: e.target.value } })
                            }
                        />
                        <Input
                            label="Password"
                            placeholder="********"
                            value={userInput.personalInfo?.password}
                            type="password"
                            onChange={e =>
                                dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { password: e.target.value } })
                            }
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="********"
                            value={userInput.personalInfo?.confirmPassword}
                            type="password"
                            onChange={e =>
                                dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { confirmPassword: e.target.value } })
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
