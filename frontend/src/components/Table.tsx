import { useState, useEffect, useContext } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { DataSyncContext, AuthContext } from "../Context"
import EditButton from "./EditButton"
import { format } from "date-fns"
import config from "../config/config"
import "../styles/table.css"


export default function Table() {
    // state hooks
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // routing hook
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [filterCategory, setFilterCategory] = useState("")

    // context hook
    const { syncTrigger } = useContext(DataSyncContext)
    const { loggedInUser } = useContext(AuthContext)

    useEffect(() => {
        const encodedEmail = encodeURIComponent(loggedInUser as string);

        // Fetch data for tabular view
        (async () => {
            if (!loggedInUser) return
            const category = searchParams.get("category") || ""
            setFilterCategory(category)

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/transaction/list?email=${encodedEmail}&category=${category}`);

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const result = await response.json();
                setData(result)
                setLoading(false)
            } catch (error) {
                const err = error as Error
                console.log(err.message);
            }
        })();

    }, [syncTrigger, loggedInUser, searchParams])

    if (loading) {
        return (
            <div className="animate-pulse">
                Loading Table...
            </div>
        )
    }

    if (data.length > 0) {
        let count = data.length

        const html = data.map((item: any) => {
            count--
            const rowData = { ...item }
            return (
                <tr key={item.id} style={{ backgroundColor: count % 2 == 0 ? "white" : "#E3F8ED" }} >
                    <td>Rs {item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.t_type}</td>
                    <td>{item.t_description}</td>
                    <td >{format(item.t_date, "MMM d, yyyy")}
                        <EditButton rowData={rowData} />
                    </td>
                </tr>
            )
        })

        return (
            <div className="overflow-x-auto overflow-y-auto mb-5 mt-5 w-full sm:w-[90%] sm:max-w-[1100px] shadow-none sm:shadow-lg sm:shadow-gray-500 border-[1px] border-[#125C38] border-solid">
                <table className="w-full">
                    <thead className="sticky top-0 h-10">
                        <tr className="bg-[#125C38] text-white font-bold text-md sm:text-lg text-center">
                            <td className="">Amount</td>
                            <td className="w-56">Category
                                <select className="rounded-md ml-2 mb-1.5 sm:mb-0 h-7 text-black text-sm font-normal bg-gray-100 "
                                    value={filterCategory}
                                    onChange={e => {
                                        navigate(`/?category=${e.target.value}`)
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="food">
                                        Food
                                    </option>
                                    <option value="clothing">
                                        Clothing
                                    </option>
                                    <option value="rent">
                                        Rent
                                    </option>
                                    <option value="entertainment">
                                        Entertainment
                                    </option>
                                    <option value="investment">
                                        Investment
                                    </option>
                                    <option value="transportation">
                                        Transportation
                                    </option>
                                    <option value="borrowed">
                                        Borrowed
                                    </option>
                                </select>
                            </td>
                            <td>Type</td>
                            <td>Description</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody >
                        {html}
                    </tbody>
                </table>
            </div>
        )

    } else {
        return (
            <div>No data</div>
        )
    }
}