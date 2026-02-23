import { useState, useContext } from "react"
import { DataSyncContext, AuthContext } from "../Context"
import config from "../config/config"

async function handleClick({ email, data, closeModal, setSyncTrigger }: any) {
    try {
        // edit transaction data
        const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, ...data, t_date: new Date() })
        })

        // Error on request fail
        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        // flip the previous state to trigger re-render
        setSyncTrigger((prev: boolean) => !prev)

        closeModal()

    } catch (error) {
        const err = error as Error
        console.log(err.message)
    }
}

export default function EditTransactionModal({ closeModal, rowData }: any) {
    // state hooks
    const [data, setData] = useState(rowData)

    // context hook
    const { setSyncTrigger } = useContext(DataSyncContext)
    const { loggedInUser } = useContext(AuthContext)

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-80 sm:w-96 h-fit flex flex-col gap-3 p-4 pl-6 pr-6 bg-[#E3F8ED] text-lg font-semibold border-[1px] border-solid border-green-300">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-3 text-[#125C38]">
                        Edit Transaction
                    </h2>
                    <button className="font-black font-mono text-2xl relative bottom-2" onClick={() => closeModal()}>X</button>
                </div>
                <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                    <label className="self-center">Amount</label>
                    <input
                        className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 "
                        type="number"
                        value={data.amount}
                        onChange={e => setData((prev: any) => ({ ...prev, amount: e.target.value }))}
                    />
                </div>

                <div className="flex justify-between gap-[3.15rem] text-md mb-1">
                    <label className="self-center">Type</label>
                    <select className="rounded-2xl w-1/2 h-9 text-black text-sm font-normal p-1 bg-white "
                        value={data.t_type}
                        onChange={e => setData((prev: any) => ({ ...prev, t_type: e.target.value }))}
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
                        value={data.category}
                        onChange={e => setData((prev: any) => ({ ...prev, category: e.target.value }))}
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
                        value={data.t_description}
                        onChange={e => setData((prev: any) => ({ ...prev, t_description: e.target.value }))}
                    />
                </div>
                <button className="bg-[#125C38] w-20 rounded-lg p-1 text-white self-center mt-4 active:scale-95"
                    onClick={async () => {
                        const email = loggedInUser
                        await handleClick({ email, data, closeModal, setSyncTrigger })
                    }}>
                    Save
                </button>
            </div>
        </div>
    )
}