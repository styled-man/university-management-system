import { cookies } from "next/headers"
import { decodeToken } from "@/utils/jwt"

export function GET() {
    const cookieJar = cookies()

    const token = decodeToken(cookieJar.get("jwt_token")?.value)

    if (!token) {
        return new Response(null, { status: 403 })
    }

    return new Response(JSON.stringify(token))
}
