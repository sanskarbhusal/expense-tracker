import { Elysia } from "elysia"
import { auth } from "./service"
import { SignUpModel } from "./model"

new Elysia()
    .post("/signup", async ({ body }) => {
        console.log("Pass")
        const response = await auth.signUP(body)
        return response
    }, {
        body: SignUpModel.signUpBody,
        response: {
            200: SignUpModel.signUpResponse,
            422: SignUpModel.signUpInvalid
        }
    }).listen(3000)
console.log("Listening on port: ", 3000)