import { status } from "elysia"
import type { LoginModel, SignUpModel } from "./model";
import { db } from "../../db/pool";
import { accountsTable } from "../../db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"

export abstract class Auth {
    // controller/service for signup route
    static async signUP({ email, password }: SignUpModel.signUpBody) {
        let queryResult

        // Check email availability
        try {
            queryResult = await db.select().from(accountsTable).where(eq(accountsTable.email, email))
        } catch (err) {
            throw status(500, "Internal Server Error")
        }

        // Elysia support throwing status() directly as errors. The 2nd argument in status() invokation is sent as response body.
        if (queryResult.length != 0) {
            throw status(422, { message: "Email not available" } satisfies SignUpModel.signUpInvalid)
        }

        // add new account 
        try {
            const passwordHash = await bcrypt.hash(password, 1)
            queryResult = await db.insert(accountsTable).values({ email, passwordHash })
        } catch (err) {
            throw status(500, "Internal Server Error")
        }

        return { message: "Account created" } satisfies SignUpModel.signUpResponse
    }


    // controller/service for signin route
    static async signIn({ email, password }: LoginModel.loginBody) {
        let queryResult

        // Check valid email and extract passwordHash if valid
        try {
            queryResult = await db.select({
                passwordHash: accountsTable.passwordHash
            }).from(accountsTable).where(eq(accountsTable.email, email))
        } catch (err) {
            throw status(500, "Internal Server Error")
        }

        // Elysia support throwing status() directly as errors. The 2nd argument in status() invokation is sent as response body.
        if (queryResult.length == 0) {
            throw status(400, { message: "Wrong email/password" } satisfies LoginModel.loginInvalid)
        }

        // compare passwordHash only after email is valid to improve performance.
        const { passwordHash } = queryResult[0]
        const passwordMatched = await bcrypt.compare(password, passwordHash)

        if (!passwordMatched) {
            throw status(400, { message: "Wrong email/password" } satisfies LoginModel.loginInvalid)
        }

        return { message: "Login successfull." } satisfies LoginModel.loginResponse
    }
}