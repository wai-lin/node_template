import { config } from "dotenv"
import path from "node:path"
import { z } from "zod"

const environmentSchema = z
	.enum(["development", "test", "staging", "production"])
	.default("production")

const dotEnvSchema = z.object({
	NODE_ENV: environmentSchema,

	DB_HOST: z.string(),
	DB_PORT: z.coerce.number(),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.string(),
	DB_DATABASE: z.string(),

	REDIS_HOST: z.string(),
	REDIS_PORT: z.coerce.number(),
	REDIS_USERNAME: z.string(),
	REDIS_PASSWORD: z.string(),
})

export type DotEnvSchema = z.infer<typeof dotEnvSchema>

/**
 * Load and Parse the
 * @param rootDir root directory path of the project
 * @returns validated environment variables
 */
export function loadDotEnv(rootDir: string) {
	const NODE_ENV = process.env.NODE_ENV

	const configPath = [
		path.resolve(rootDir, ".env"),
		path.resolve(rootDir, ".env.local"),
		path.resolve(rootDir, `.env.${NODE_ENV}`),
		path.resolve(rootDir, `.env.${NODE_ENV}.local`),
	]

	config({ path: configPath, override: true })

	global.env = dotEnvSchema.parse(process.env)
}