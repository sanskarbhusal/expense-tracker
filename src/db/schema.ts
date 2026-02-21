import { pgTable, pgEnum, varchar, serial, numeric, text, date, } from "drizzle-orm/pg-core";


export const transactionTypeEnum = pgEnum("transaction_types", ["expense", "income"])
export const transactionCategoryEnum = pgEnum("categories", [
    'food',
    'clothing',
    'rent',
    'entertainment',
    'investment',
    'transportation',
    'salary',
    'borrowed'
])

export const accountsTable = pgTable("accounts", {
    email: varchar({ length: 255 }).primaryKey(),
    passwordHash: text("password_hash").notNull()
})

export const transactionsTable = pgTable("transactions", {
    id: serial().primaryKey(),
    email: varchar({ length: 255 }).references(() => accountsTable.email),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    transactionType: transactionTypeEnum("transaction_type").notNull(),
    category: transactionCategoryEnum().notNull(),
    transactionDescription: text("transaction_description"),
    transactionsDate: date("transaction_date").notNull()
})