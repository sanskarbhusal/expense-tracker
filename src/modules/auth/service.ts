import { status } from "elysia"
import type { SignUpModel } from "./model";
import { db } from "../../db/pool";
import { accountsTable } from "../../db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"

export abstract class auth {
    static async signUP({ email, password }: SignUpModel.signUpBody) {
        let result

        // Check email availability
        try {
            result = await db.select().from(accountsTable).where(eq(accountsTable.email, email))
        } catch (err) {
            throw status(500, "Internal Server Error")
        }

        // Throwing status sends response directly. Elysia has higher level try block to catch this error.
        // The the 2nd argument object of status() is sent in the response body.
        if (result.length != 0) {
            throw status(422, { message: "Email not available" } satisfies SignUpModel.signUpInvalid)
        }

        // add new account 
        try {
            const passwordHash = await bcrypt.hash(password, 1)
            result = await db.insert(accountsTable).values({ email, passwordHash })
        } catch (err) {
            throw status(500, "Internal Server Error")
        }

        return { message: "Account created" } satisfies SignUpModel.signUpResponse
    }
}