import "dotenv/config"
import { Elysia, status } from "elysia"
import { auth } from "./service"
import { SignUpModel } from "./model"

export default new Elysia()
    .post("/signup", async ({ body }) => {
        const response = await auth.signUP(body)
        return response
    }, {
        body: SignUpModel.signUpBody,
        response: {
            200: SignUpModel.signUpResponse,
            422: SignUpModel.signUpInvalid
        }
    })