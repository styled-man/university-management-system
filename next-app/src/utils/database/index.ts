import { Pool } from "pg"

let connection: Pool | null = null

if (!connection) {
    connection = new Pool({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    })
}

export default connection

export { queryBuilder } from "./queryBuilder"
export * from "./formatter"
export * from "./error"
