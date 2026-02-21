import "dotenv/config"
import { dbConfigObj } from "./config"
import { drizzle } from "drizzle-orm/bun-sql"
import { SQL } from "bun"

const client = new SQL(dbConfigObj)
export const db = drizzle({ client, casing: "snake_case" })
