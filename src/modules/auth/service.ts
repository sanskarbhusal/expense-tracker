import { status } from "elysia"
import type { SignUpModel } from "./model";
import { db } from "../../db/pool";

export abstract class auth {
    static async signUP({ email, password }: SignUpModel.signUpBody) {
        if (email != "test@gmail.com") {
            throw status(422, { message: "Email not available" } satisfies SignUpModel.signUpInvalid)
        }

        return {
            message: "Account created"
        } satisfies SignUpModel.signUpResponse
    }
}