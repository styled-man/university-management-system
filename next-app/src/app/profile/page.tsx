"use client"

import Input from "@/components/Input"
import Section from "@/components/Section"
import SubmitButton from "@/components/SubmitButton"
import { INITIAL_STATE, UserData, userDataReducer } from "@/utils/reducers/userData"
import { useRouter } from "next/navigation"
import { FormEvent, MouseEvent, useEffect, useReducer } from "react"

export default function Setup() {
    const router = useRouter()
    const [userInput, dispatch] = useReducer(userDataReducer, INITIAL_STATE)

    async function handleSubmit(event: FormEvent<HTMLFormElement>, formName: keyof UserData) {
        event.preventDefault()

        const ApiMap: { [key in keyof UserData]: string } = {
            personalInfo: "personalInfo",
            addresses: "",
        }

        if (userInput.personalInfo.dateOfBirth) {
            dispatch({
                type: "MODIFY_PERSONAL_INFO",
                payload: { dateOfBirth: new Date(userInput.personalInfo.dateOfBirth).toLocaleDateString("fr-CA") },
            })
        }

        const response = await fetch(`/api/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ [ApiMap[formName]]: userInput[formName] }),
        })

        if (!response.ok && response.status !== 304) {
            alert("Something went wrong")
        }

        window.location.reload()
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

    useEffect(() => {
        ;(async function () {
            const fields = ["firstName", "lastName", "email", "phoneNumber", "dateOfBirth", "gender"]
            const response = await fetch(`/api/profile-info?${fields.map(f => `fields=${f}`).join("&")}`, {
                method: "GET",
            })

            if (!response.ok) {
                alert("Something went wrong")
                return
            }
            const data: Partial<PersonalInfo> = await response.json()

            if (data.dateOfBirth) {
                const tempDate = new Date(data.dateOfBirth)
                tempDate.setDate(tempDate.getDate() + 1)
                data.dateOfBirth = tempDate.toLocaleDateString("en-US")
            }
            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: data })
        })()
    }, [])

    return (
        <main className="flex items-center justify-center flex-col gap-8 mx-10 my-[5vh]">
            <Section title="Personal Information">
                <form
                    className="grid grid-cols-2 gap-y-6 gap-x-20 mt-10"
                    onSubmit={e => handleSubmit(e, "personalInfo")}
                >
                    <Input
                        label="First Name"
                        value={userInput.personalInfo?.firstName || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { firstName: e.target.value } })
                        }
                    />
                    <Input
                        label="Last Name"
                        value={userInput.personalInfo?.lastName || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { lastName: e.target.value } })
                        }
                    />
                    <Input
                        label="Email"
                        value={userInput.personalInfo?.email || ""}
                        onChange={e => dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { email: e.target.value } })}
                    />
                    <Input
                        label="Phone Number"
                        value={userInput.personalInfo?.phoneNumber || ""}
                        onChange={e =>
                            dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { phoneNumber: e.target.value } })
                        }
                    />
                    <Input
                        label="Gender"
                        value={userInput.personalInfo?.gender || ""}
                        onChange={e => dispatch({ type: "MODIFY_PERSONAL_INFO", payload: { gender: e.target.value } })}
                    />
                    <Input
                        label="Date of Birth"
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
                <form className="grid grid-cols-2 gap-y-6 gap-x-20 my-10" onSubmit={e => handleSubmit(e, "addresses")}>
                    <Input
                        label="Street"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { street: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="Street 2"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { street2: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="Street 3"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { street3: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="City"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { city: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="State"
                        onChange={e =>
                            dispatch({
                                type: "MODIFY_ADDRESS",
                                payload: { index: 0, data: { state: e.target.value } },
                            })
                        }
                    />
                    <Input
                        label="Zip Code"
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
