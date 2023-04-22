import { DatabaseError } from "pg"

export function databaseError(e: DatabaseError | unknown) {
    const error = e as DatabaseError

    switch (error.code) {
        case "23502":
            return new Response(null, {
                status: 400,
                statusText: `${error.column?.replaceAll("_", " ")} cannot be null!`,
            })
        case "22001":
            return new Response(null, { status: 409, statusText: `Invalid phone number!` })
        case "23505":
            return new Response(null, { status: 409, statusText: "User with those credentials already exist!" })
        default:
            return new Response(null, { status: 500, statusText: "Something went wrong!" })
    }
}
