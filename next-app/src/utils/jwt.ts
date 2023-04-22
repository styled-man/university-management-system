import { sign } from "jsonwebtoken"

export function createToken<T>(data: T) {
    const expirationData = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    return sign({ data, exp: expirationData }, process.env.JWT_SECRET)
}
