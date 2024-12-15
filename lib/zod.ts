import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z, { type ZodTypeAny } from "zod";

extendZodWithOpenApi(z);

/**
 * Parse zod schema asynchronously. Returns error and data.
 *
 * @param schema - Zod schema
 * @param data - Data to parse
 */
async function parseSchema<S extends ZodTypeAny, D>(schema: S, data: D) {
	return await schema.safeParseAsync(data).then((r) => {
		if (r.success) return [null, r.data] as const;
		else return [r.error, null] as const;
	});
}

export { parseSchema, z };
