export type DbConfigObjType = {

    host: string
    username: string
    password: string
    database: string
    port: number
    max?: number // max number of clients in pool.
    ssl: boolean
}