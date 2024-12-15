import {
	OpenApiGeneratorV31,
	OpenAPIRegistry,
	type RouteConfig,
	type ZodMediaTypeObject,
} from "@asteasolutions/zod-to-openapi";
import type {
	ComponentTypeKey,
	ResponseConfig,
} from "@asteasolutions/zod-to-openapi/dist/openapi-registry.js";
import type { OpenAPIObjectConfigV31 } from "@asteasolutions/zod-to-openapi/dist/v3.1/openapi-generator.js";
import { apiReference } from "@scalar/express-api-reference";
import type { Express } from "express";
import type { ZodTypeAny } from "zod";
import { z } from "./zod.ts";

export class OpenAPI {
	registry = new OpenAPIRegistry();

	/**
	 * Registers a raw OpenAPI component. Use this if you have a simple object instead of a Zod schema.
	 *
	 * @param type - The component type, e.g. schemas, responses, securitySchemes, etc.
	 * @param name - The name of the object, it is the key under the component type in the resulting OpenAPI document
	 * @param component - The actual object to put there
	 */
	component(type: ComponentTypeKey, name: string, component: any) {
		return this.registry.registerComponent(type, name, component);
	}

	/**
	 * Registers a new parameter schema under /components/parameters/${name}
	 *
	 * @param refId - The name of the schema
	 * @param zodSchema - The Zod schema to register
	 */
	param<Z = ZodTypeAny>(refId: string, zodSchema: Z) {
		return this.registry.registerParameter(refId, zodSchema as ZodTypeAny);
	}

	/**
	 * Registers a new component schema under /components/schemas/${name}
	 *
	 * @param refId - The name of the schema
	 * @param zodSchema - The Zod schema to register
	 */
	schema<Z extends ZodTypeAny>(refId: string, zodSchema: Z) {
		return this.registry.register(refId, zodSchema);
	}

	/**
	 * Registers a new path that would be generated under paths:
	 *
	 * @param tags - The tags to assign to the path
	 * @param config - The configuration of the path
	 */
	path(tags: string | string[], config: Omit<RouteConfig, "tags">) {
		this.registry.registerPath({
			...config,
			tags: Array.isArray(tags) ? tags : [tags],
		});
	}

	/**
	 * Registers a new webhook that would be generated under webhooks:
	 *
	 * @param tags - The tags to assign to the webhook
	 * @param config - The configuration of the webhook
	 */
	webhook(tags: string | string[], config: Omit<RouteConfig, "tags">) {
		this.registry.registerWebhook({
			...config,
			tags: Array.isArray(tags) ? tags : [tags],
		});
	}

	/**
	 * Generates the OpenAPI document
	 *
	 * @param config - The configuration of the OpenAPI document
	 * @returns
	 */
	generateDocumentation(config: Omit<OpenAPIObjectConfigV31, "openapi">) {
		const generator = new OpenApiGeneratorV31(this.registry.definitions);
		return generator.generateDocument({
			...config,
			openapi: "3.1.0",
		});
	}

	/**
	 * Prefixes a path with a given prefix
	 * @param prefix - The prefix to add to the path
	 */
	static prefixPath(prefix: string) {
		return (path: string) => `${prefix}${path}`;
	}

	/**
	 * Creates a new response schema.
	 *
	 * @param value - Response value of schema
	 * @param meta - Response meta of schema
	 */
	static responseSchema<V extends ZodTypeAny, M extends ZodTypeAny>(
		value: V,
		meta?: M,
	) {
		return z.object({
			code: z.string(),
			message: z.string(),
			value,
			meta: meta ? meta : z.null(),
		});
	}

	/**
	 * Creates a new error response schema.
	 */
	static errorResponseSchema<S extends ZodTypeAny>(schema: S): ResponseConfig {
		return {
			description: "Internal Server Error.",
			content: {
				"application/json": { schema },
			},
		};
	}

	/**
	 * Creates a new `application/json` body object for OpenAPI
	 * @param schema
	 */
	static jsonBody<C extends ZodMediaTypeObject>(content: C) {
		return { "application/json": content };
	}

	/**
	 * Serves the API documentation UI and JSON at the specified paths.
	 *
	 * @param app - The Express app
	 * @param config - The configuration of the API documentation
	 */
	static serveApiDoc(
		app: Express,
		config: {
			uiPath: string;
			jsonPath: string;
			docs: OpenAPI;
			docsConfig: Omit<OpenAPIObjectConfigV31, "openapi">;
		},
	) {
		const { uiPath, jsonPath, docs, docsConfig } = config;
		app.get(jsonPath, (req, res) => {
			const jsonDocs = docs.generateDocumentation(docsConfig);
			res.json(jsonDocs);
		});
		app.get(uiPath, apiReference({ spec: { url: jsonPath } }));
	}
}
