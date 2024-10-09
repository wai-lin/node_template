import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Get isomorphic `__dirname` for `ESM` and `CJS`.
 * @returns Current Directory Path
 */
export function getDirname() {
	if (typeof __dirname !== "undefined") return __dirname
	return dirname(fileURLToPath(import.meta.url))
}
