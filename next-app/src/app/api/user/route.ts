import connection, { databaseError, queryBuilder, toSnakeCase } from "@/utils/database"
import { createToken } from "@/utils/jwt"
import { hash } from "argon2"
import { QueryResult } from "pg"

export async function PUT(request: Request) {
    let userInfo: Partial<UserWithId>
    let data: QueryResult<UserWithId>

    // if body is not included in the request, or is malformed
    try {
        userInfo = await request.json()
    } catch {
        return new Response(null, { status: 400 })
    }

    // double check that the password exist and that it matches the confirm password
    if (!userInfo.password) {
        return new Response(null, { status: 400, statusText: "Missing password!" })
    } else if (userInfo.password !== userInfo.confirmPassword) {
        return new Response(null, { status: 400, statusText: "Password and Confirm password Field does not match!" })
    }

    // hash the password
    userInfo.password = await hash(userInfo.password)

    // remove the confirm password field so that it can be inserted into the db
    delete userInfo.confirmPassword

    // extract the data from what the user sent
    const { columns, parameters, values } = queryBuilder.columnsAndValues(toSnakeCase(userInfo))

    try {
        // insert data into the database
        data = (await connection?.query(
            `INSERT INTO profile_info ${columns} VALUES (${parameters}) RETURNING id, email, first_name, last_name`,
            values
        )) as QueryResult<UserWithId>
    } catch (e) {
        // if there is an error, show the appropriate message
        return databaseError(e)
    }

    // return what was received from the database
    return new Response(JSON.stringify({ ...data }), {
        headers: {
            "Set-Cookie": `jwt_token=${createToken(data)}; HttpOnly; Secure; Path=/`,
        },
    })
}
