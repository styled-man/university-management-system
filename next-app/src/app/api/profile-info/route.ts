import connection, { databaseError, queryBuilder, toCamelCase } from "@/utils/database"
import { decodeToken } from "@/utils/jwt"
import { cookies } from "next/headers"
import { QueryResult } from "pg"
import { parse } from "url"

export async function GET(request: Request) {
    const session = decodeToken(cookies().get("jwt_token")?.value)
    const queryUrl = parse(request.url).query

    let data: QueryResult<PersonalInfoWithId>

    if (!session) {
        return new Response(null, { status: 401 })
    } else if (!queryUrl) {
        return new Response(null, { status: 400 })
    }

    const fieldsToGet = new URLSearchParams(queryUrl).getAll("fields")

    try {
        data = (await connection?.query(`
            SELECT 
                ${queryBuilder.get(fieldsToGet)} 
                FROM profile_info 
                WHERE id = ${session.data.id}
        `)) as QueryResult<PersonalInfoWithId>
    } catch (e) {
        // if there is an error, show the appropriate message
        return databaseError(e)
    }

    return new Response(JSON.stringify(toCamelCase(data.rows[0])), { status: 200 })
}
