import { Session } from "./jwt"

export async function signIn(email: string, password: string) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    return response
}

export async function singOut() {
    const response = await fetch("/api/logout", {
        method: "HEAD",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return response
}

export async function getSession() {
    const response = await fetch("/api/session", {
        method: "GET",
    })

    return response
}
