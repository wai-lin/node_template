import { OpenAPI } from "@lib/openapi.ts";
import { z } from "@lib/zod.ts";

/**
 * Open API Schema for API version 1
 */
export const apiV1Docs = new OpenAPI();

/**
 * Bearer Auth Security Scheme
 */
export const bearerAuth = apiV1Docs.component("securitySchemes", "bearerAuth", {
	type: "http",
	scheme: "bearer",
	bearerFormat: "JWT",
});

export const InternalServerError = OpenAPI.errorResponseSchema(
	apiV1Docs.schema(
		"InternalServerError",
		z.object({ code: z.string(), message: z.string(), error: z.any() }),
	),
);
