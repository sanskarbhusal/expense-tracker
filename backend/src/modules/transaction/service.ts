import { db } from "../../db/pool"
import { transactionsTable } from "../../db/schema";
import { eq, and, sql } from "drizzle-orm"
import { status } from "elysia"
import {
    ListModel,
    EditModel,
    DeleteModel,
    OverviewModel,
    AddModel
} from "./model"

export abstract class Transaction {
    // controller for /list route
    static async list(query: ListModel.listQuery) {
        let queryResult
        try {
            if (query.category != undefined) {
                queryResult = await db.select().from(transactionsTable).where(
                    and(
                        eq(transactionsTable.email, query.email),
                        eq(transactionsTable.category, query.category)
                    )
                )
            } else {
                queryResult = await db.select().from(transactionsTable).where(eq(transactionsTable.email, query.email),)
            }
        } catch (error) {
            throw status(500, "Internal Server Error")
        }

        return queryResult
    }


    // controller for /edit route
    static async edit(body: EditModel.editBody) {
        let queryResult

        try {
            queryResult = await db.update(transactionsTable)
                .set({
                    email: body.email,
                    amount: body.amount,
                    transactionType: body.transactionType,
                    category: body.category,
                    transactionDescription: body.transactionDescription,
                    transactionDate: body.transactionDate
                }).where(eq(transactionsTable.id, body.id)).returning()
        } catch (error) {
            throw status(500, "Internal Server Error")
        }

        if (queryResult.length == 0) {
            throw status(422, { message: "Record for given id not found." } satisfies EditModel.invalidId)
        }

        return { message: "Success" } satisfies EditModel.editResponse
    }


    // controller for /delete
    static async delete({ id }: DeleteModel.deleteParams) {
        let queryResult

        try {
            queryResult = await db.delete(transactionsTable).where(eq(transactionsTable.id, id)).returning()
        } catch (error) {
            throw status(500, "Internal Server Error")
        }

        if (queryResult.length == 0) {
            throw status(422, { message: "Record for given id not found." } satisfies DeleteModel.invalidId)
        }

        return { message: "Success." } satisfies DeleteModel.deleteResponse
    }

    // controller for /overview
    static async getOverview({ email }: OverviewModel.overviewParams) {
        let queryResult

        try {
            queryResult = await db.select({
                category: transactionsTable.category,
                sum: sql<string>`sum(${transactionsTable.amount})`
            }).from(transactionsTable)
                .where(
                    and(
                        eq(transactionsTable.email, email),
                        eq(transactionsTable.transactionType, "expense")
                    )
                )
                .groupBy(transactionsTable.category)

        } catch (error) {
            throw status(500, "Internal Server Error")
        }

        return queryResult
    }

    // controller for /add
    static async addTransaction(body: AddModel.addBody) {
        let queryResult

        try {
            queryResult = await db.insert(transactionsTable).values({
                email: body.email,
                amount: body.amount,
                transactionType: body.transactionType,
                category: body.category,
                transactionDescription: body.transactionDescription,
                transactionDate: body.transactionDate
            }).returning()
        } catch (error) {
            const err = error as Error
            console.log(err.message)
            throw status(500, "Internal Server Error")
        }

        if (queryResult.length == 0) {
            throw status(500, "Insertion failed.")
        }

        return { message: "Success." } satisfies AddModel.addResponse
    }
}