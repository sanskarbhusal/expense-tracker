import { useState } from "react"
import { useNavigate, Link } from "react-router"
import config from "../config/config"
import "../styles/input.css"


async function handleLogin(email: string, password: string, setErrorMsg: any, navigate: any) {
    try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        if (response.status == 500) {
            throw new Error("Backend Padkyo!")
        }
        if (!response.ok) {
            const resBody = await response.json()
            throw new Error(resBody.message)
        }

        localStorage.setItem("loggedInUser", email)
        navigate("/")

    } catch (error) {
        const err = error as Error
        setErrorMsg(err.message)
    }
}

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    return (
        <div className="relative h-[100vh] flex flex-col justify-center gap-4 bg-[#E3F8ED]">
            <h1 className="text-3xl fixed top-0 font-extrabold font-mono text-[#125C38] m-3">
                Clarity
            </h1>
            <span className="relative h-3 text-red-500 text-xl self-center font-normal">{errorMsg}</span>
            <form className="relative rounded-2xl w-[90%] sm:max-w-96 self-center flex flex-col gap-3 p-4 pl-6 pr-6 bg-[#125C38] text-white text-lg font-semibold border-[1px] border-solid border-gray-500">
                <h2 className="text-2xl font-bold text-white mb-3">
                    Welcome Back
                </h2>
                <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                    <label htmlFor="email" className="self-center">Email</label>
                    <input
                        className="rounded-2xl w-full h-9 text-black text-sm font-normal p-1 "
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={() => {
                            setErrorMsg("")
                        }}
                    />
                </div>
                <div className="flex justify-between gap-4 text-md">
                    <label htmlFor="password" className="self-center">Password</label>
                    <input
                        className="rounded-2xl w-full h-9 text-black text-sm font-normal p-1"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={() => {
                            setErrorMsg("")
                        }}
                    />
                </div>
                <button className="bg-[#E3F8ED] w-20 rounded-lg text-black self-center mt-4 active:scale-95"
                    onClick={(e) => {
                        e.preventDefault()
                        handleLogin(email, password, setErrorMsg, navigate)
                    }}>
                    Login
                </button>
            </form>
            <Link
                className="relative self-center text-[#125C38] hover:underline "
                to="/signup">
                Don't have an account?
            </Link>
        </div>
    )
}