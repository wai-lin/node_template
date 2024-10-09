import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"; // cspell: disable-line
import z from "zod"

extendZodWithOpenApi(z)

export { z }
