import { decodeToken } from "@/utils/jwt"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface DashboardLayout {
    children: ReactNode
    student: ReactNode
    teacher: ReactNode
}

export default async function dashboardLayout({ student, children }: DashboardLayout) {
    if (!decodeToken(cookies().get("jwt_token")?.value)) {
        return redirect("/login")
    }
    return children
    // console.log(headers().get("x-invoke-path"))

    // switch (headers().get("x-invoke-path")) {
    //     case "/dashboard":
    //         return student

    //     default:
    //         return children
    // }
}
