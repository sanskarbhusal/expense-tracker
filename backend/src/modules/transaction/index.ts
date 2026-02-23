import { Elysia } from "elysia"
import { Transaction } from "./service"
import { AddModel, DeleteModel, EditModel, ListModel, OverviewModel } from "./model"


export default new Elysia({ prefix: "/api/v1/transaction" })
    .get("/list", async ({ query }) => {
        console.log(query)
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
            200: EditModel.editResponse,
            422: EditModel.invalidId
        }
    })
    .delete("/:id", async ({ params }) => {
        const response = await Transaction.delete(params)
        return response
    }, {
        params: DeleteModel.deleteParams,
        response: {
            200: DeleteModel.deleteResponse,
            422: DeleteModel.invalidId
        }
    })
    .get("/overview/:email", async ({ params }) => {
        const response = await Transaction.getOverview(params)
        return response
    }, {
        params: OverviewModel.overviewParams,
        response: {
            200: OverviewModel.overviewResponse
        }
    })
    .post("/add", async ({ body }) => {
        const response = await Transaction.addTransaction(body)
        return response
    }, {
        body: AddModel.addBody,
        response: {
            200: AddModel.addResponse
        }
    })