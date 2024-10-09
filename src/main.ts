import express from "express"
import http from "node:http"
import path from "node:path"

import { getDirname } from "../lib/dirname.js"
import { loadDotEnv } from "../lib/env.js"

const _dirname = getDirname()
const rootDir = path.resolve(_dirname, "..")

loadDotEnv(rootDir)

/**
 * Main function that starts server.
 */
function main() {
	const app = express()

	app.use(
		express.urlencoded({ extended: true }),
		express.json(),
	)

	const server = http.createServer(app).listen(global.env.PORT)
	server.on("error", (err) => {
		server.close()
		setTimeout(() => server.listen(global.env.PORT), 1000) // Auto restart server on error
	})
}

try {
	main()
} catch (err) {
	console.log("Server exited with error: ")
	console.error(err)
	process.exit(1)
}
