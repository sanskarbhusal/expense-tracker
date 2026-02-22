import { Elysia } from "elysia"
import { Transaction } from "./service"
import { DeleteModel, EditModel, ListModel } from "./model"


export default new Elysia({ prefix: "/api/v1/transaction" })
    .get("/list", async ({ query }) => {
        const response = await Transaction.list(query)
        return response
    }, {
        query: ListModel.listQuery,
        response: {
            200: ListModel.listResponse
        }
    })
    .patch("/edit", async ({ body }) => {
        const response = await Transaction.edit(body)
        return response
    }, {
        body: EditModel.editBody,
        response: {
            200: EditModel.editResponse
        }
    })
    .delete("/:transactionId", async ({ params }) => {
        const response = await Transaction.delete(params)
        return response
    }, {
        params: DeleteModel.deleteParams,
        response: DeleteModel.deleteResponse
    })
    .get("/getOverview/:email", () => { })
    .post("/add", () => { }, {})