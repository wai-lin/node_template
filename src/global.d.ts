import type { DotEnvSchema } from "./lib/env.ts"

declare global {
	namespace NodeJS {
		interface Global {
			env: DotEnvSchema
		}
	}
}
