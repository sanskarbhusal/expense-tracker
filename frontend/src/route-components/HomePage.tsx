import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router"
import PieChart from '../components/PieChart'
import Table from "../components/Table"
import { HomePageBlurContext, DataSyncContext, AuthContext } from "../Context"
import AddTransactionModal from "../components/AddTransactionModal"

function App() {
    // state hooks
    const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)
    const [applyBlur, setApplyBlur] = useState(false)
    const [syncTrigger, setSyncTrigger] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState("")
    // routing hook
    const navigate = useNavigate()

    // Check if user is logged in (my kaam chalaau auth logic) 
    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser")
        if (!loggedInUser) {
            navigate("/login")
        }
        setLoggedInUser(loggedInUser as string)
    }, [])

    return (
        <HomePageBlurContext value={(bool) => setApplyBlur(bool)} >
            <AuthContext value={{ loggedInUser }}>
                <DataSyncContext value={{ syncTrigger, setSyncTrigger }}>
                    <div className={`h-[100dvh] flex flex-col items-center transition-all px-2.5 ${applyBlur ? "blur-3xl" : ""}`}>
                        <div className="w-full flex justify-between mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-[#125C38] cursor-default"
                            onClick={() => { navigate("/?category=") }}
                        >
                            Expense Tracker
                            <button className="font-black text-4xl w-[2.95rem] text-[#125C38] bg-gray-100 border-[1px] border-solid border-gray-200 hover:bg-gray-200 active:scale-90 transition-all rounded-full pt-1 "
                                onClick={() => {
                                    setShowAddTransactionModal(true)
                                    setApplyBlur(true)
                                }}
                            >+</button>

                            {
                                showAddTransactionModal && createPortal(
                                    <AddTransactionModal
                                        closeModal={() => {
                                            setShowAddTransactionModal(false)
                                            setApplyBlur(false)
                                        }}
                                    />, document.body)
                            }

                        </div>
                        <PieChart />
                        <Table />

                    </div>
                </DataSyncContext>
            </AuthContext>
        </HomePageBlurContext >
    )
}

export default App