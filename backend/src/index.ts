import auth from "./modules/auth"
import transaction from "./modules/transaction"
import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"


new Elysia().use(auth)
    .use(cors())
    .use(transaction)
    .listen(3000)
console.log("Listening on port: ", 3000)
