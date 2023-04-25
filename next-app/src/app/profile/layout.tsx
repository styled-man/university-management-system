import { decodeToken } from "@/utils/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface ProfileLayout {
    children: ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayout) {
    const session = decodeToken(cookies().get("jwt_token")?.value)
    if (!session) {
        return redirect("/")
    }

    return children
}
