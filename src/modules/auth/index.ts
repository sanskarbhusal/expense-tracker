import "dotenv/config"
import { Elysia, status } from "elysia"
import { Auth } from "./service"
import { SignUpModel, LoginModel } from "./model"

export default new Elysia({ prefix: "/api/v1/auth" })
    .post("/signup", async ({ body }) => {
        const response = await Auth.signUP(body)
        return response
    }, {
        body: SignUpModel.signUpBody,
        response: {
            200: SignUpModel.signUpResponse,
            422: SignUpModel.signUpInvalid
        }
    }).post("/signin", async ({ body }) => {
        const response = await Auth.signIn(body)
        return response
    }, {
        body: LoginModel.loginBody,
        response: {
            200: LoginModel.loginResponse,
            400: LoginModel.loginInvalid
        }
    })