import { t } from "elysia"
import { createSelectSchema, createInsertSchema } from "drizzle-typebox"
import { transactionsTable } from "../../db/schema"


export namespace ListModel {
    const TransactionsTableSchema = createSelectSchema(transactionsTable)

    // request query schema
    export const listQuery = t.Union([t.Pick(TransactionsTableSchema, ["email"]), t.Pick(TransactionsTableSchema, ["email", "category"])])
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

    // invalid id response schema
    export const invalidId = t.Object({
        message: t.Literal("Record for given id not found.")
    })
    // invalid id response type
    export type invalidId = typeof invalidId.static
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

    // invalid id response schema
    export const invalidId = t.Object({
        message: t.Literal("Record for given id not found.")
    })
    // invalid id response type
    export type invalidId = typeof invalidId.static
}


export namespace OverviewModel {
    const TransactionsTableSchema = createSelectSchema(transactionsTable)

    // request params schema
    export const overviewParams = t.Object({
        email: t.String({ format: "email" })
    })
    // request params type
    export type overviewParams = typeof overviewParams.static

    // response body schema     
    export const overviewResponse = t.Array(t.Object({
        ...t.Pick(TransactionsTableSchema, ["category"]).properties,
        sum: t.Number()
    }))
    // response body type
    export type overviewResponse = typeof overviewResponse.static
}


export namespace AddModel {
    const TransactionsTableSchema = createInsertSchema(transactionsTable)

    // request body schema
    export const addBody = t.Omit(TransactionsTableSchema, ["id"])
    // request body type
    export type addBody = typeof addBody.static

    // response body schema
    export const addResponse = t.Object({
        message: t.Literal("Success.")
    })
    // response body type
    export type addResponse = typeof addResponse.static
}

