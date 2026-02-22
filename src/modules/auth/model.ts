import { t } from "elysia"

export namespace SignUpModel {
    // request body validation model
    export const signUpBody = t.Object({
        email: t.String(),
        password: t.String()
    })

    // request body type 
    export type signUpBody = typeof signUpBody.static

    // response body validation model
    export const signUpResponse = t.Object({
        message: t.Literal("Account created")
    })

    // response body type
    export type signUpResponse = typeof signUpResponse.static

    // invalid response body validation model
    export const signUpInvalid = t.Object({
        message: t.Literal("Email not available")
    })

    // invalid response body type
    export type signUpInvalid = typeof signUpInvalid.static
}

export namespace LoginModel {
    // request body validatiaon model
    export const loginBody = t.Object({
        email: t.String(),
        password: t.String()
    })

    // request body type 
    export type loginBody = typeof loginBody.static

    // response body validation model
    export const loginResponse = t.Object({
        message: t.Literal("Login successfull.")
    })

    // response body type
    export type loginResponse = typeof loginResponse.static

    // invalid response body validation model
    export const loginInvalid = t.Object({
        message: t.Literal("Wrong email/password")
    })

    // invalid response body type
    export type loginInvalid = typeof loginInvalid.static
}
