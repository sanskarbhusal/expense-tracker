import { t } from "elysia"
import { createSelectSchema } from "drizzle-typebox"
import { Type } from "@sinclair/typebox"
import { transactionsTable } from "../../db/schema"
import { DefaultLogger } from "drizzle-orm"


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
    export const editBody = TransactionsTableSchema
    // request body type
    export type editBody = typeof editBody.static

    // response body schema
    export const editResponse = t.Object({
        message: t.Literal("Success")
    })
    // response body type
    export type editResponse = typeof editResponse.static
}

export namespace DeleteModel {
    // request params schema
    export const deleteParams = t.Object({
        id: t.Number()
    })
    // request params type
    export type deleteParams = typeof deleteParams.static

    // response body schema
    export const deleteResponse = t.Object({
        message: t.Literal("Success.")
    })
    // response body type
    export type deleteResponse = typeof deleteResponse.static

}

export namespace GetOverviewModel {

}

export namespace AddModel {

}

