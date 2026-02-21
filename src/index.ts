import auth from "./modules/auth"
import { Elysia } from "elysia"


new Elysia().use(auth).listen(3000)
console.log("Listening on port: ", 3000)
