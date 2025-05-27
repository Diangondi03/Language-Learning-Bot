import { useSignals } from "@preact/signals-react/runtime"
import { chats, deleteId } from "../../signals"
import axiosInstance from "../../axiosConfig"
import { useNavigate } from "react-router"

const DeleteModal = () => {

    useSignals()
    const navigate = useNavigate()
    const handleDelete = async () => {
        try{

            await axiosInstance.delete(`/chat/${deleteId.value}`)
            chats.value = chats.value.filter(chat => chat.chat_id !== deleteId.value)
            navigate("/app")

        } catch(e){
            console.log(e)
        }
    }
    return (
        <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box dark:bg-neutral-800">
                <p className="py-4">Are you sure you want to delete this chat?</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-error mx-2" onClick={handleDelete}>Delete</button>
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteModal