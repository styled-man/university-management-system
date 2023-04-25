import connection, { databaseError, queryBuilder, toSnakeCase } from "@/utils/database"
import { cookies } from "next/headers"
import { Session, createToken, decodeToken } from "@/utils/jwt"
import { hash } from "argon2"
import { QueryResult } from "pg"

export async function PUT(request: Request) {
    let userInfo: Partial<PersonalInfoWithId>
    let data: QueryResult<PersonalInfoWithId>

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

    const userType = userInfo.accountType

    // remove the confirm password field so that it can be inserted into the db
    delete userInfo.confirmPassword
    delete userInfo.accountType

    // extract the data from what the user sent
    const { columns, parameters, values } = queryBuilder.insert(toSnakeCase(userInfo))

    try {
        // insert data into the database
        data = (await connection?.query(
            `INSERT INTO profile_info ${columns} VALUES (${parameters}) RETURNING id, email, first_name, last_name`,
            values
        )) as QueryResult<PersonalInfoWithId>
    } catch (e) {
        // if there is an error, show the appropriate message
        return databaseError(e)
    }

    try {
        await connection?.query("INSERT INTO student (id) VALUES ($1)", [data.rows[0].id])
    } catch (e) {
        return databaseError(e)
    }

    // return what was received from the database
    return new Response(JSON.stringify({ ...data.rows[0], accountType: userType }), {
        status: 201,
        headers: {
            "Set-Cookie": `jwt_token=${createToken(data.rows[0])}; HttpOnly; Secure; Path=/`,
        },
    })
}

export async function PATCH(request: Request) {
    let userInfo: { personalInfo: Partial<PersonalInfoWithId>; studentInfo: Partial<Student> }
    const session = decodeToken(cookies().get("jwt_token")?.value)
    let modified = false
    let responseMeta: ResponseInit = {}

    if (!session) {
        return new Response(null, { status: 401 })
    }

    // get the fields to update from the user's request
    try {
        userInfo = await request.json()
    } catch {
        return new Response(null, { status: 400 })
    }

    // if new personal info is included
    if (userInfo.personalInfo && Object.keys(userInfo.personalInfo).length) {
        const { parameters: personalInfoParams, values: personalInfoValues } = queryBuilder.update(
            toSnakeCase(userInfo.personalInfo)
        )

        try {
            ;(await connection?.query(
                `
                UPDATE profile_info
                    SET ${personalInfoParams}
                    WHERE id = ${session.data.id}
                `,
                personalInfoValues
            )) as QueryResult<Session>
        } catch (e) {
            return databaseError(e)
        }

        const data = (await connection?.query(
            `SELECT id, email, first_name, last_name FROM profile_info WHERE id = ${session.data.id}`
        )) as QueryResult<Session>

        responseMeta = {
            ...responseMeta,
            headers: { "Set-Cookie": `jwt_token=${createToken(data.rows[0])}; HttpOnly; Secure; Path=/` },
        }

        modified = true
    }

    if (userInfo.studentInfo && Object.keys(userInfo.studentInfo).length) {
        const { parameters: studentInfoParams, values: studentInfoValues } = queryBuilder.update(
            toSnakeCase(userInfo.studentInfo)
        )

        try {
            await connection?.query(
                `UPDATE student SET ${studentInfoParams} WHERE profile_info_id = ${session.data.id}`,
                [studentInfoValues]
            )
        } catch (e) {
            return databaseError(e)
        }
        modified = true
    }

    return new Response(null, { ...responseMeta, status: modified ? 200 : 304 })
}

export async function DELETE(request: Request) {
    const userInfo = decodeToken(cookies().get("jwt_token")?.value)

    if (!userInfo) {
        return new Response(null, { status: 401 })
    }

    try {
        await connection?.query("DELETE FROM student WHERE profile_info_id = $1", [userInfo?.data.id])
        await connection?.query("DELETE FROM profile_info WHERE id = $1", [userInfo?.data.id])
    } catch (e) {
        return databaseError(e)
    }

    return new Response(null, {
        status: 200,
        headers: { "Set-Cookie": `jwt_token=; expires=${new Date().toUTCString()}; Path=/` },
    })
}
