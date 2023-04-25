import { decodeToken } from "@/utils/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface DashboardLayout {
    student: ReactNode
    teacher: ReactNode
}

export default async function dashboardLayout({ student, teacher }: DashboardLayout) {
    if (!decodeToken(cookies().get("jwt_token")?.value)) {
        return redirect("/login")
    }
    return student
}
