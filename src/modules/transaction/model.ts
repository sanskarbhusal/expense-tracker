import { t } from "elysia"
import { createSelectSchema } from "drizzle-typebox"
import { Type } from "@sinclair/typebox"
import { transactionsTable } from "../../db/schema"


export namespace ListModel {
    const TransactionsTableSchema = createSelectSchema(transactionsTable)

    // request query schema
    export const listQuery = Type.Union([t.Pick(TransactionsTableSchema, ["email"]), t.Pick(TransactionsTableSchema, ["email", "category"])])
    // request query type
    export type listQuery = typeof listQuery.static

    // response body schema
    export const listResponse = t.Array(t.Omit(TransactionsTableSchema, ["email"]))
    // response body type
    export type listResponse = typeof listResponse.static
}

export namespace EditModel {
    const TransactionsTableSchema = createSelectSchema(transactionsTable)

    // request body schema
    export const requestBody = TransactionsTableSchema
    // request body type
    export type requestBody = typeof requestBody.static

    // response body schema
    export const responseBody = t.Object({
        message: t.Literal("Success")
    })
    // response body type
    export type responseBody = typeof responseBody.static
}

export namespace DeleteModel {

}

export namespace GetOverviewModel {

}

export namespace AddModel {

}

