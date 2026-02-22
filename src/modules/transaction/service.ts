import { ListModel, EditModel } from "./model"
import { db } from "../../db/pool"
import { transactionsTable } from "../../db/schema";
import { eq, and } from "drizzle-orm"
import { status } from "elysia"

export abstract class Transaction {
    // controller for /list route
    static async list(query: ListModel.listQuery) {
        let result

        try {
            if ("category" in query && query.category != "") {
                result = await db.select().from(transactionsTable).where(
                    and(
                        eq(transactionsTable.email, query.email),
                        eq(transactionsTable.category, query.category)
                    )
                )
            } else {
                result = await db.select().from(transactionsTable).where(eq(transactionsTable.email, query.email),)
            }
        } catch (error) {
            const err = error as Error
            console.log(err.message)
            throw status(500, "Internal Server Error")
        }

        return result
    }


    // controller for /edit route
    static async edit(body: EditModel.requestBody) {
        let result

        try {
            result = await db.update(transactionsTable)
                .set({
                    email: body.email,
                    amount: body.amount,
                    transactionType: body.transactionType,
                    category: body.category,
                    transactionDescription: body.transactionDescription,
                    transactionDate: body.transactionDate
                }).where(
                    eq(
                        transactionsTable.id, body.id
                    )
                )
        } catch (error) {
            const err = error as Error
            console.log(err.message)
            throw status(500, "Internal Server Error")
        }

        return { message: "Success" } satisfies EditModel.responseBody
    }
}