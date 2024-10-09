import { DotEnvSchema } from "./lib/env.ts";

declare global {
	var env: DotEnvSchema;

	namespace NodeJS {
		interface ProcessEnv {}
	}
}

export { };

