import connection, { databaseError, queryBuilder, toSnakeCase } from "@/utils/database"
import { cookies } from "next/headers"
import { createToken, decodeToken } from "@/utils/jwt"
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
    const { columns, parameters, values } = queryBuilder.columnsAndValues(toSnakeCase(userInfo))

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
        await connection?.query("INSERT INTO student (profile_info_id, major, gpa, credits) VALUES ($1, $2, 0.0, 0)", [
            data.rows[0].id,
            `N/A`,
        ])
    } catch (e) {
        return databaseError(e)
    }

    // return what was received from the database
    return new Response(JSON.stringify({ ...data.rows[0], accountType: userType }), {
        headers: {
            "Set-Cookie": `jwt_token=${createToken(data.rows[0])}; HttpOnly; Secure; Path=/`,
        },
    })
}

export async function UPDATE(request: Request) {
    let userInfo: { personalInfo: Partial<PersonalInfoWithId>; studentInfo: Partial<Student> }
    const session = decodeToken(cookies().get("jwt_token")?.value)

    if (!session) {
        return new Response(null, { status: 401 })
    }

    // get the fields to update from the user's request
    try {
        userInfo = await request.json()
    } catch {
        return new Response(null, { status: 400 })
    }

    const {
        columns: personaInfoCols,
        parameters: personalInfoParams,
        values: personalInfoVal,
    } = queryBuilder.columnsAndValues(toSnakeCase(userInfo.personalInfo))

    const {
        columns: studentInfoCols,
        parameters: studentInfoParams,
        values: studentInfoVal,
    } = queryBuilder.columnsAndValues(toSnakeCase(userInfo.studentInfo))

    try {
        await connection?.query("UPDATE profile_info SET WHERE profile_info_id = $1", [session.data.id])
        await connection?.query("UPDATE FROM profile_info WHERE id = $1", [session.data.id])
    } catch (e) {
        return databaseError(e)
    }
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
