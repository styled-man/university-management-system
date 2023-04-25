"use client"

import Input from "@/components/Input"
import Loading from "@/components/Loading"
import SubmitButton from "@/components/SubmitButton"
import { INITIAL_STATE, userDataReducer } from "@/utils/reducers/userData"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useReducer, useState } from "react"

export default function Apply() {
    const router = useRouter()

    const [userInfo, dispatch] = useReducer(userDataReducer, INITIAL_STATE)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setLoading(true)

        const response = await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userInfo.personalInfo }),
        })

        if (!response.ok) {
            setError(response.statusText)
            setLoading(false)
            return
        }

        router.push("/profile")
    }

    useEffect(() => {
        dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { accountType: "student" } })
    }, [])

    return (
        <>
            {<Loading show={isLoading} />}

            <main className="flex items-center flex-col justify-center">
                <div className="bg-white mt-[10vh] p-10 shadow rounded-md">
                    <h1 className="text-center font-bold text-2xl mb-5">Register</h1>

                    <form className="w-[80vh] mt-10" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                placeholder="John"
                                value={userInfo.personalInfo?.firstName || ""}
                                onChange={e =>
                                    dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { firstName: e.target.value } })
                                }
                            />
                            <Input
                                label="Last Name"
                                placeholder="Doe"
                                value={userInfo.personalInfo?.lastName || ""}
                                onChange={e =>
                                    dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { lastName: e.target.value } })
                                }
                            />
                            <Input
                                label="Email"
                                placeholder="someone@email.com"
                                value={userInfo.personalInfo?.email || ""}
                                onChange={e =>
                                    dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { email: e.target.value } })
                                }
                            />
                            <Input
                                label="Phone number"
                                placeholder="(000) 123-4567"
                                value={userInfo.personalInfo?.phoneNumber || ""}
                                onChange={e =>
                                    dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { phoneNumber: e.target.value } })
                                }
                            />
                            <Input
                                label="Password"
                                placeholder="********"
                                value={userInfo.personalInfo?.password || ""}
                                type="password"
                                onChange={e =>
                                    dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { password: e.target.value } })
                                }
                            />
                            <Input
                                label="Confirm Password"
                                placeholder="********"
                                value={userInfo.personalInfo?.confirmPassword || ""}
                                type="password"
                                onChange={e =>
                                    dispatch({
                                        type: "MODIFY_PERSONAL_INFO",
                                        payload: { confirmPassword: e.target.value },
                                    })
                                }
                            />
                        </div>

                        <hr className="mt-10 mb-5" />

                        <div className="">
                            <label className="font-bold text-md">Type:</label>
                            <select
                                value={userInfo.personalInfo?.accountType || "student"}
                                onChange={e =>
                                    dispatch({
                                        type: "MODIFY_PERSONAL_INFO",
                                        payload: { accountType: e.target.value as PersonalInfo["accountType"] },
                                    })
                                }
                            >
                                <option value="student" className="text-xs">
                                    Student
                                </option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>

                        <SubmitButton>Register</SubmitButton>
                        <h3 className="text-red-600 text-center capitalize">{error}</h3>
                    </form>
                </div>
            </main>
        </>
    )
}
