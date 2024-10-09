import { defineConfig } from "drizzle-kit"

import { getDirname } from "./lib/dirname.ts"
import { loadDotEnv } from "./lib/env.ts"

const _dirname = getDirname()
loadDotEnv(_dirname)

export default defineConfig({
	out: "./database/pg/migrations",
	schema: "./database/pg/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		host: global.env.DB_HOST,
		port: global.env.DB_PORT,
		user: global.env.DB_USER,
		password: global.env.DB_PASSWORD,
		database: global.env.DB_DATABASE,
		ssl: global.env.DB_SSL_CONNECTION,
	},
})
