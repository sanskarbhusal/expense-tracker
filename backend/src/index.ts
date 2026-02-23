import auth from "./modules/auth"
import transaction from "./modules/transaction"
import { Elysia } from "elysia"


new Elysia().use(auth)
    .use(transaction)
    .listen(3000)
console.log("Listening on port: ", 3000)
