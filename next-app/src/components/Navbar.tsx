"use client"

import { getSession, singOut } from "@/utils/auth"
import { Session } from "@/utils/jwt"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Loading from "./Loading"

type NavLinks = {
    name: string
    link: string
    style?: "outline"
    active?: true
}

export default function Navbar() {
    const [session, setSession] = useState<Session | null>(null)
    const [showMenu, setMenu] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const dropdownMenu = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const navLinks = useMemo(
        (): NavLinks[] => [
            {
                name: "Login",
                link: "/login",
            },
            {
                name: "Sign Up",
                link: "/apply",
                style: "outline",
            },
        ],
        []
    )

    useEffect(() => {
        function handleDropdownMenu(event: MouseEvent) {
            console.log(dropdownMenu.current?.contains(event.target as HTMLElement))
            if (showMenu && !dropdownMenu.current?.contains(event.target as HTMLElement)) {
                setMenu(false)
            }
        }

        document.addEventListener("click", handleDropdownMenu)

        return () => {
            document.removeEventListener("click", handleDropdownMenu)
        }
    }, [showMenu])

    useEffect(() => {
        ;(async function () {
            const response = await getSession()

            if (!response.ok) {
                return
            }

            setSession(await response.json())
        })()
    }, [])

    async function handleSignOut() {
        setLoading(true)
        await singOut()
        router.refresh()
        setLoading(false)
    }

    return (
        <>
            <Loading show={isLoading} />
            <nav className="flex items-center justify-between mx-10 my-5">
                <div>
                    <Link href={session ? "dashboard" : "/"} className="text-4xl font-bold">
                        UMS
                    </Link>
                </div>
                {session ? (
                    <div className="relative">
                        <button
                            className="flex items-center justify-center rounded-full p-3 bg-black bg-opacity-20 w-10 h-10 mr-8 z-20"
                            onClick={() => setMenu(!showMenu)}
                        >
                            <span className="text-xl">{session.data.firstName.charAt(0)}</span>
                            <span className="text-xl">{session.data.lastName.charAt(0)}</span>
                        </button>

                        {showMenu ? (
                            <>
                                <div className="absolute -right-4 -bottom-48 bg-white py-5 px-3 z-10 rounded-md shadow-lg">
                                    <div className="flex items-center justify-center flex-col">
                                        <Link className="hover:bg-slate-200 py-3 px-5 rounded" href="/dashboard">
                                            dashboard
                                        </Link>
                                        <Link
                                            className="hover:bg-slate-200 py-3 px-5 rounded w-full text-center"
                                            href="/profile"
                                        >
                                            profile
                                        </Link>
                                        <button
                                            className="hover:bg-slate-200 py-3 px-5 rounded w-full text-center"
                                            onClick={handleSignOut}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-10" />
                            </>
                        ) : null}
                    </div>
                ) : (
                    <div className="flex items-center justify-center flex-row gap-16">
                        {navLinks.map(({ name, link, style }) => (
                            <Link
                                key={name}
                                href={link}
                                className={`font-normal text-lg py-1 rounded-md border-black transition-colors duration-300 ${
                                    style === "outline" && "border-2 hover:bg-black hover:text-white px-10"
                                }`}
                            >
                                <span
                                    className={`border-black transition-[border] duration-100  ${
                                        !style && "hover:border-b-2"
                                    }`}
                                >
                                    {name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </>
    )
}
