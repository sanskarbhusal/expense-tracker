import 'dotenv/config'
import { defineConfig } from "drizzle-kit"
import { dbConfigObj } from './src/db/config'

export default defineConfig({
    out: "./dizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        host: dbConfigObj.host,
        database: dbConfigObj.database,
        password: dbConfigObj.password,
        port: dbConfigObj.port,
        user: dbConfigObj.username,
        ssl: dbConfigObj.ssl
    }
})