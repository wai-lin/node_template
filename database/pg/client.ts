import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
	host: global.env.DB_HOST,
	port: global.env.DB_PORT,
	user: global.env.DB_USER,
	password: global.env.DB_PASSWORD,
	database: global.env.DB_DATABASE,
	ssl: global.env.DB_SSL_CONNECTION,
})

export const db = drizzle(pool)
