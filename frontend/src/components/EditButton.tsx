import { useState, useContext } from "react"
import { HomePageBlurContext } from "../Context"
import { createPortal } from "react-dom"
import EditTransactionModal from "./EditTransactionModal"

export default function EditButton({ rowData }: any) {
    // state hook
    const [showEditTransactionModal, setShowEditTransactionModal] = useState(false)

    // context hook
    const applyBlur = useContext(HomePageBlurContext)

    return (
        <div className="group mx-1 py-2 px-[0.4rem] rounded-full inline"
            onClick={() => {
                setShowEditTransactionModal(true)
                applyBlur(true)
            }}>
            {
                showEditTransactionModal
                && createPortal(
                    <EditTransactionModal
                        closeModal={() => {
                            setShowEditTransactionModal(false)
                            applyBlur(false)
                        }}
                        rowData={rowData} />,
                    document.body)
            }
            <svg
                className="stroke-gray-400 w-5 group-hover:stroke-black inline transition-all duration-75"
                viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
            </svg>
        </div >
    )

}