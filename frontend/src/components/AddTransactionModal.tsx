import { useState, useContext } from "react"
import { DataSyncContext, AuthContext } from "../Context"
import config from "../config/config"

async function handleClick({ loggedInUser, amount, t_type, category, t_description, closeModal, setSyncTrigger }: any) {
    try {

        // insert transaction data
        const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: loggedInUser, amount, t_type, category, t_description, t_date: new Date() })
        })

        // parse response json payload into object
        const result = await response.json()

        // Error on request fail
        if (!response.ok) {
            throw new Error(result.message)
        }

        // flip the previous state to trigger re-render
        setSyncTrigger((prev: boolean) => !prev)

        closeModal()

    } catch (error) {
        const err = error as Error
        console.log(err.message)
    }
}

export default function AddTransaction({ closeModal }: any) {
    // state hooks
    const [amount, setAmount] = useState("")
    const [t_type, setType] = useState("")
    const [category, setCategory] = useState("")
    const [t_description, setDescription] = useState("")

    //context hooks
    const { setSyncTrigger } = useContext(DataSyncContext)
    const { loggedInUser } = useContext(AuthContext)

    return (
        <form className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-80 sm:w-96 h-fit flex flex-col gap-3 p-4 pl-6 pr-6 bg-[#E3F8ED] text-lg font-semibold border-[1px] border-solid border-green-300">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-3 text-[#125C38]">
                    Add Transaction
                </h2>
                <button onClick={closeModal} className="font-black font-mono text-2xl relative bottom-2">X</button>
            </div>
            <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                <label className="self-center">Amount</label>
                <input
                    className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 "
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
            </div>

            <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                <label className="self-center">Type</label>
                <select className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 bg-white "
                    value={t_type}
                    onChange={e => setType(e.target.value)}
                >
                    <option></option>
                    <option value="expense">
                        expense
                    </option>
                    <option value="income">
                        income
                    </option>
                </select>
            </div>

            <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                <label className="self-center">Category</label>
                <select className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 bg-white "
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option></option>
                    <option value="food">
                        food
                    </option>
                    <option value="clothing">
                        clothing
                    </option>
                    <option value="rent">
                        rent
                    </option>
                    <option value="entertainment">
                        entertainment
                    </option>
                    <option value="investment">
                        investment
                    </option>
                    <option value="transportation">
                        transportation
                    </option>
                    <option value="borrowed">
                        borrowed
                    </option>
                </select>
            </div>
            <div className="flex flex-col justify-between gap-4 text-md">
                <textarea
                    className="rounded-2xl w-full max-h-48 text-black text-sm font-normal p-3"
                    placeholder="Description"
                    rows={10}
                    value={t_description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <button className="bg-[#125C38] w-20 rounded-lg p-1 text-white self-center mt-4 active:scale-95"
                onClick={async (e) => {
                    e.preventDefault()
                    await handleClick({ loggedInUser, amount, t_type, category, t_description, closeModal, setSyncTrigger })
                }}>
                Add
            </button>
        </form >
    )
}