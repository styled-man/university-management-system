import { JwtPayload, sign, verify } from "jsonwebtoken"
import { toCamelCase } from "./database"

export interface Session {
    data: {
        id: number
        email: string
        firstName: string
        lastName: string
    }
    exp: number
    iat: number
}

export function createToken<T extends object>(data: T) {
    const expirationData = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    return sign({ data: toCamelCase(data), exp: expirationData }, process.env.JWT_SECRET)
}

export function decodeToken(token?: string) {
    let data: JwtPayload | string

    try {
        data = verify(token || "", process.env.JWT_SECRET)
    } catch {
        return null
    }

    return data as Session
}
