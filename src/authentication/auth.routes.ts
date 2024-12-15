/**
 * Classic Authentication
 *
 * This is a basic email and password authentication process.
 */

import { Router } from "express";

import { OpenAPI } from "@lib/openapi.ts";
import { z } from "@lib/zod.ts";
import { apiV1Docs, bearerAuth, InternalServerError } from "@src/openapi.ts";

// ==============================~~~==============================
// DTOs
// ==============================~~~==============================
const AuthRegisterRequest = apiV1Docs.schema(
	"AuthRegisterRequest",
	z.object({
		email: z.string().email(),
		password: z.string().min(8),
	}),
);

const AuthSignInRequest = apiV1Docs.schema(
	"AuthSignInRequest",
	z.object({
		email: z.string().email(),
		password: z.string().min(8),
	}),
);
const AuthSignInResponse = apiV1Docs.schema(
	"AuthSignInResponse",
	OpenAPI.responseSchema(z.object({ token: z.string() })),
);

// ==============================~~~==============================
// API Specs
// ==============================~~~==============================
const tagName = "Authentication";
const pathName = OpenAPI.prefixPath("/auth");

apiV1Docs.path(tagName, {
	method: "post",
	path: pathName("/register"),
	description: "Register a new user.",
	request: {
		body: {
			content: OpenAPI.jsonBody({ schema: AuthRegisterRequest }),
		},
	},
	responses: {
		200: {
			description: "User registered successfully",
		},
		500: InternalServerError,
	},
});

apiV1Docs.path(tagName, {
	method: "post",
	path: pathName("/sign-in"),
	description: "Sign in a user.",
	request: {
		body: {
			content: OpenAPI.jsonBody({ schema: AuthSignInRequest }),
		},
	},
	responses: {
		200: {
			description: "User signed in successfully",
			content: OpenAPI.jsonBody({ schema: AuthSignInResponse }),
		},
		404: {
			description: "User not found.",
		},
		500: InternalServerError,
	},
});

apiV1Docs.path(tagName, {
	method: "post",
	path: pathName("/sign-out"),
	description: "🔐 Sign out a user.",
	security: [
		{
			[bearerAuth.name]: [],
		},
	],
	responses: {
		200: {
			description: "User signed out successfully",
		},
		500: InternalServerError,
	},
});

// ==============================~~~==============================
// Routes
// ==============================~~~==============================
const authRoutes = Router();

// authRoutes.post("/auth/register", (req, res) => {
//    const r = AuthRegisterRequest.safeParseAsync(req.body)
// });

// authRoutes.post("/sign-in");

// authRoutes.post("/sign-out");

export { authRoutes };
