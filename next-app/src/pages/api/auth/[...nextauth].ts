import PostgresAdapter from "@/lib/adapter"
import NextAuth from "next-auth"
import { Pool } from "pg"

const dbConnection = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: +process.env.DATABASE_PORT,
})

export default NextAuth({
    providers: [],
    adapter: PostgresAdapter(dbConnection),
})
