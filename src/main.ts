import cors from "cors";
import express from "express";
import http from "node:http";
import path from "node:path";

import { getDirname } from "@lib/dirname.js";
import { loadDotEnv } from "@lib/env.js";
import { OpenAPI } from "@lib/openapi.ts";
import { apiV1Docs } from "./openapi.ts";
import { routes } from "./routes.ts";

const _dirname = getDirname();
const rootDir = path.resolve(_dirname, "..");

loadDotEnv(rootDir);

/**
 * Main function that starts server.
 */
function main() {
	const app = express();

	app.use(
		cors(), // allow cross-origins requests
		express.urlencoded({ extended: true }), // parse Content-Type: form-urlencoded
		express.json(), // parse Content-Type: application/json
	);

	// Register routes
	app.use(routes);

	OpenAPI.serveApiDoc(app, {
		uiPath: "/api-v1-docs",
		jsonPath: "/api-v1-docs.json",
		docs: apiV1Docs,
		docsConfig: {
			info: {
				title: "API Documentation",
				version: "1.0.0",
			},
		},
	});

	const server = http.createServer(app).listen(global.env.PORT, () => {
		console.log(`Server started on port ${global.env.PORT}`);
	});
	server.on("error", (err) => {
		// Auto restart server on error
		server.close();
		setTimeout(() => server.listen(global.env.PORT), 1000);
	});
}

try {
	main();
} catch (err) {
	console.log("Server exited with error: ");
	console.error(err);
	process.exit(1);
}
