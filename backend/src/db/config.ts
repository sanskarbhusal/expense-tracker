import type { DbConfigObjType } from "./@types/dbConfigObj"

let dbConfigObj: DbConfigObjType

if (process.env.ENVIRONMENT == 'production') {
    dbConfigObj = {
        host: process.env.DB_HOST_PRODUCTION || "",
        username: process.env.DB_USER_PRODUCTION || "",
        password: process.env.DB_PASSWORD_PRODUCTION || "",
        database: process.env.DB_NAME_PRODUCTION || "",
        port: Number(process.env.DB_PORT_PRODUCTION) || 3000,
        max: 2,
        ssl: false
    }
} else {
    dbConfigObj = {
        host: process.env.DB_HOST_LOCAL || "",
        username: process.env.DB_USER_LOCAL || "",
        password: process.env.DB_PASSWORD_LOCAL || "",
        database: process.env.DB_NAME_LOCAL || "",
        port: Number(process.env.DB_PORT_LOCAL) || 3000,
        ssl: false
    }
}

export { dbConfigObj }