import connection from "@/utils/database"
import { createToken } from "@/utils/jwt"
import { verify } from "argon2"
import { DatabaseError, QueryResult } from "pg"

export async function POST(request: Request) {
    let userInfo: Partial<UserWithId>
    let data: QueryResult<UserWithId>

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
        data = (await connection?.query(
            `SELECT id, email, first_name, last_name, password FROM profile_info WHERE email = $1`,
            [userInfo.email]
        )) as QueryResult<UserWithId>
    } catch (e) {
        const error = e as DatabaseError
        return new Response(null, { status: 500, statusText: error.message })
    }

    // if the email was not found in the database
    if (!data.rowCount) {
        return new Response(null, { status: 403, statusText: "Invalid email or password!" })
    }

    // if the passwords that was sent does not match the password in the database
    if (!(await verify(data.rows[0].password!, userInfo.password))) {
        return new Response(null, { status: 403, statusText: "Invalid email or password!" })
    }

    userInfo = data.rows[0]
    delete userInfo.password

    console.log("api:", userInfo)

    return new Response(JSON.stringify({ ...userInfo }), {
        headers: {
            "Set-Cookie": `jwt_token=${createToken(userInfo)}; HttpOnly; Secure; Path=/`,
        },
    })
}
