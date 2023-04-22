import connection from "@/utils/database"
import { verify } from "argon2"
import { NextResponse } from "next/server"
import { DatabaseError, QueryResult } from "pg"

export async function POST(request: Request) {
    let userInfo: Partial<PersonalInfo>
    let data: QueryResult<PersonalInfo & { id: number }>

    // if body is not included in the request, or is malformed
    try {
        userInfo = await request.json()
    } catch {
        return new Response(null, { status: 400 })
    }

    // make sure that every field is included in the email
    if (!userInfo.email) {
        return new Response(null, { status: 400, statusText: "Invalid email!" })
    } else if (!userInfo.password) {
        return new Response(null, { status: 400, statusText: "Invalid password!" })
    }

    // look for the user in the database via the email provided
    try {
        data = (await connection?.query(`SELECT id, password FROM profile_info WHERE email = $1`, [
            userInfo.email,
        ])) as QueryResult<PersonalInfo & { id: number }>
    } catch (e) {
        const error = e as DatabaseError
        return new Response(null, { status: 500, statusText: error.message })
    }

    // if the email was not found in the database
    if (!data.rowCount) {
        return new Response(null, { status: 403, statusText: "Invalid email or password!" })
    }

    // if the passwords match
    if (await verify(data.rows[0].password!, userInfo.password)) {
        return NextResponse.json({ id: data.rows[0].id })
    }

    return new Response(null, { status: 403, statusText: "Invalid email or password!" })
}
