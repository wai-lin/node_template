import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

// ==============================~~~==============================
// Common Fields
// ==============================~~~==============================
const id = uuid("id").primaryKey().notNull().defaultRandom()

const timeSeries = {
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	deletedAt: timestamp("deleted_at"),
}

const baseColumns = { id, ...timeSeries }

// ==============================~~~==============================
// Tables
// ==============================~~~==============================
export const usersTable = pgTable("users", {
	...baseColumns,
	email: text("email").unique(),
	password: text("password").unique(),
	emailVerified: boolean("email_verified"),
})

// ==============================~~~==============================
// ORM Relationships
// ==============================~~~==============================
