import path from "node:path"
import { getDirname } from "./lib/dirname.js"
import { loadDotEnv } from "./lib/env.js"

const _dirname = getDirname()
const rootDir = path.resolve(_dirname, "..")
console.log(loadDotEnv(rootDir))

// const app = express()

// app.listen(3000, () => {})
