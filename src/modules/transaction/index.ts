import { Elysia } from "elysia"
import { Transaction } from "./service"
import { ListModel } from "./model"


export default new Elysia({ prefix: "/api/v1/transaction" })
    .get("/list", async ({ query }) => {
        const response = await Transaction.list(query)
        return response
    }, { query: ListModel.listQuery })
    .patch("/edit", () => { }, {})
    .delete("/delete", () => { }, {})
    .get("/getOverview/:email", () => { })
    .post("/add", () => { }, {})