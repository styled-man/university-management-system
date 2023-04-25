"use client"

import Input from "@/components/Input"
import Section from "@/components/Section"
import SubmitButton from "@/components/SubmitButton"
import { INITIAL_STATE, UserData, userDataReducer } from "@/utils/reducers/userData"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useReducer, MouseEvent } from "react"

export default function Setup() {
    const router = useRouter()
    const [userInput, dispatch] = useReducer(userDataReducer, INITIAL_STATE)

    function handleSubmit(event: FormEvent<HTMLFormElement>, formName?: keyof UserData) {
        event.preventDefault()
    }

    async function deleteAccount(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        const response = await fetch("/api/user", {
            method: "DELETE",
        })

        if (response.ok) {
            router.push("/")
        }
    }

    return (
        <main className="flex items-center justify-center flex-col gap-8 mx-10 my-[5vh]">
            <Section title="Personal Information">
                <form
                    className="grid grid-cols-2 gap-y-6 gap-x-20 mt-10"
                    onSubmit={e => handleSubmit(e, "personalInfo")}
                >
                    <Input
                        label="First Name"
                        placeholder="John"
                        value={userInput.personalInfo?.firstName || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { firstName: e.target.value } })
                        }
                    />
                    <Input
                        label="Last Name"
                        placeholder="John"
                        value={userInput.personalInfo?.lastName || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { lastName: e.target.value } })
                        }
                    />
                    <Input
                        label="Email"
                        placeholder="someone@email.com"
                        value={userInput.personalInfo?.email || ""}
                        onChange={e => dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { email: e.target.value } })}
                    />
                    <Input
                        label="Phone Number"
                        placeholder="(000) 123-4567"
                        value={userInput.personalInfo?.phoneNumber || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { phoneNumber: e.target.value } })
                        }
                    />
                    <Input
                        label="Gender"
                        placeholder="Male, Female, Non Binary, ect..."
                        value={userInput.personalInfo?.gender || ""}
                        onChange={e => dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { gender: e.target.value } })}
                    />
                    <Input
                        label="Date of Birth"
                        placeholder="08/12/1972"
                        value={userInput.personalInfo?.dateOfBirth || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { dateOfBirth: e.target.value } })
                        }
                    />
                    <div />
                    <div className="flex items-center justify-end">
                        <div className="w-[30%]">
                            <SubmitButton>Save</SubmitButton>
                        </div>
                    </div>
                </form>
            </Section>

            <Section title="Addresses">
                <form className="grid grid-cols-2 gap-y-6 gap-x-20 my-10" onSubmit={handleSubmit}>
                    <Input
                        label="Street"
                        placeholder="John"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { street: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="Street 2"
                        placeholder=""
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { street2: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="Street 3"
                        placeholder="someone@email.com"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { street3: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="City"
                        placeholder="Miami"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { city: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="State"
                        placeholder="Male, Female, Non Binary, ect..."
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { state: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="Zip Code"
                        placeholder="08/12/1972"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { zipCode: e.target.value } },
                            })
                        }
                    />
                </form>
            </Section>

            <div>
                <button
                    onClick={deleteAccount}
                    className="border border-red-600 py-3 px-5 rounded-md hover:bg-red-500 hover:text-white"
                >
                    Delete Account
                </button>
            </div>
        </main>
    )
}
