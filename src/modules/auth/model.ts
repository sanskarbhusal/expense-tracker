import { t } from "elysia"

export namespace SignUpModel {
    // request body DTO
    export const signUpBody = t.Object({
        email: t.String(),
        password: t.String()
    })

    // request body type 
    export type signUpBody = typeof signUpBody.static

    // response body DTO
    export const signUpResponse = t.Object({
        message: t.Literal("Account created")
    })

    // response body type
    export type signUpResponse = typeof signUpResponse.static

    // invalid response body DTO
    export const signUpInvalid = t.Object({
        message: t.Literal("Email not available")
    })

    // invalid response body type
    export type signUpInvalid = typeof signUpInvalid.static
}

export namespace SignInModal {
    // request body DTO
    export const signInBody = t.Object({
        email: t.String(),
        password: t.String()
    })

    // request body type 
    export type signInBody = typeof signInBody.static

    // response body DTO
    export const signInResponse = t.Object({
        message: t.Literal("Login successfull.")
    })

    // response body type
    export type signInResponse = typeof signInResponse.static

    // invalid response body DTO
    export const signInInvalid = t.Object({
        message: t.Literal("Wrong email/password")
    })

    // invalid response body type
    export type signUpInvalid = typeof signInInvalid.static

}
