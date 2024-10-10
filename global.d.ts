import { DotEnvSchema } from "./lib/env.ts"

declare global {
	var env: DotEnvSchema

	namespace NodeJS {
		interface ProcessEnv {}
	}

	namespace JWT {
		interface Payload {
			id: string
		}
	}
}

export { }

