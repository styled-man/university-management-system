"use client"

import Link from "next/link"
import { useMemo } from "react"

type NavLinks = {
    name: string
    link: string
    style?: "outline"
    active?: true
}

export default function Navbar() {
    const navLinks = useMemo(
        () =>
            [
                {
                    name: "Home",
                    link: "/",
                },
                {
                    name: "Contact",
                    link: "/contact",
                },
                {
                    name: "Login",
                    link: "/auth",
                    style: "outline",
                },
            ] as NavLinks[],
        []
    )
    return (
        <nav className="flex items-center justify-between mx-10 my-5">
            <div>
                <Link href="/" className="text-4xl font-bold">
                    UMS
                </Link>
            </div>
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
        </nav>
    )
}
