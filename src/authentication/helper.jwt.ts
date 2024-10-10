import jwt from "jsonwebtoken"

// ==============================~~~==============================
// ==============================~~~==============================
export interface JwtEncodeArgs<V extends object> {
	value: V
	secret?: string
	options?: jwt.SignOptions
}
/**
 * Encode the given object to JWT token.
 * @returns JWT Token
 */
export function jwtEncode<V extends object = JWT.Payload>({
	value,
	secret = global.env.JWT_SECRET,
	options = { expiresIn: global.env.JWT_EXPIRES_IN },
}: JwtEncodeArgs<V>) {
	let token: string | undefined = undefined
	let err: Error | null = null
	jwt.sign(value, secret, options, (e, t) => {
		token = t
		err = e
	})
	return [err, token]
}

// ==============================~~~==============================
// ==============================~~~==============================
export interface JwtVerifyArgs {
	token: string
	secret?: string
}
/**
 * Verify the given token if it's valid or not.
 * @returns decoded token
 */
export function jwtVerify<V extends object = JWT.Payload>({
	token,
	secret = global.env.JWT_SECRET,
}: JwtVerifyArgs) {
	let decoded: V | undefined = undefined
	let err: jwt.VerifyErrors | null = null
	jwt.verify(token, secret, (e, t) => {
		decoded = t as V
		err = e
	})
	return [err, decoded]
}
