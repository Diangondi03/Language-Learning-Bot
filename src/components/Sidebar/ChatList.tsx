import {  useSignals } from "@preact/signals-react/runtime";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import {chats, indexSidebar, deleteId} from "../../signals"
import axiosInstance from "../../axiosConfig";
import { useEffect } from "react";
import { Chat } from "../../interfaces";
const ChatList = () => {
    
    const navigate = useNavigate()
    const {chatId} = useParams()
    useSignals()

    const clickChatItem = (index:number) =>{
        indexSidebar.value = index
        navigate("/app/"+(index))
        if (window.innerWidth < 1024) {
            // User width is less than 1024
            document.getElementById('my-drawer-2')?.click()
        }
    }
    
    const getChatList = async() => {
        try{

            const res = await axiosInstance.get('/chat')
            chats.value = res.data
            
        }
        catch(err){
            console.log(err)
        }

    }
    const clickDelete = (id:number) => {
        const modal = document.getElementById('deleteModal') as HTMLDialogElement | null;
        if (modal && typeof modal.showModal === 'function') {
            document.body.style.overflowY = 'hidden'
            modal.showModal();
            deleteId.value = id
        }
    }
    
    useEffect(()=>{
        getChatList()
        indexSidebar.value = Number(chatId)
    },[chatId])

  return (
    <div className="max-h-[65vh] h-[65vh] overflow-y-auto flex flex-col gap-0">

        {chats.value.map((chat:Chat, i) => (
            <li key={i} className="group relative">
                <button
                    className={`btn btn-ghost justify-start w-[95%] rounded-full overflow-hidden text-ellipsis whitespace-nowrap flex items-center border-none hover:shadow-none ${indexSidebar.value === chat.chat_id ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white" : "dark:hover:bg-neutral-600 dark:hover:text-white"}`}
                    onClick={()=>clickChatItem(chat.chat_id)}
                >
                    <span className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                        {chat.title}
                    </span>
                    
                    <div   
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 p-1 rounded-full hover:bg-red-100 cursor-default"
                        onClick={e => {
                            e.stopPropagation();
                            clickDelete(chat.chat_id)
                        }}
                        tabIndex={-1}
                    >
                        <RiDeleteBin5Line/>
                    </div>
                </button>
            </li>
        ))}
    </div>
  )
}

export default ChatList