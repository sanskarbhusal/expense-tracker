import { Link } from "react-router"

export default function SignupSucessPage() {
    return (
        <>
            <h1 className="text-3xl self-center" > Signup Sucessfull</h1>
            <Link className="text-[#125C38]" to="/login">Goto Login page</Link>
        </>
    )
}