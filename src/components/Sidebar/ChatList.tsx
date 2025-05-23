import { useSignal, useSignals } from "@preact/signals-react/runtime";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import {chats} from "../../signals"
import axiosInstance from "../../axiosConfig";
import { useEffect } from "react";
const ChatList = () => {
    const indexSidebar = useSignal(-1)
    const navigate = useNavigate()
    useSignals()

    const clickChatItem = (index:number) =>{
        indexSidebar.value = index
        navigate("/app/"+(index+1))
        if (window.innerWidth < 1024) {
            // User width is less than 1024
            document.getElementById('my-drawer-2')?.click()
        }
    }
    
    const getChatList = async() => {
        try{

            const res = await axiosInstance.get('/chat')
            chats.value = res.data
            console.log(chats.value)
        }
        catch(err){
            console.log(err)
        }

    }
    useEffect(()=>{
        getChatList()
    },[])

  return (
    <div className="max-h-[65vh] h-[65vh] overflow-y-auto flex flex-col gap-0">

        {Array(6).fill("").map((_, i) => (
            <li key={i} className="group relative">
                <button
                    className={`btn btn-ghost justify-start w-[95%] rounded-full overflow-hidden text-ellipsis whitespace-nowrap flex items-center border-none hover:shadow-none ${indexSidebar.value === i ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white" : "dark:hover:bg-neutral-600 dark:hover:text-white"}`}
                    onClick={()=>clickChatItem(i)}
                >
                    <span className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                        {"Chat " + (i + 1)}
                    </span>
                    
                    <button
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 p-1 rounded-full hover:bg-red-100 cursor-default"
                        onClick={e => {
                            e.stopPropagation();
                            
                        }}
                        tabIndex={-1}
                    >
                        <RiDeleteBin5Line/>
                    </button>
                </button>
            </li>
        ))}
    </div>
  )
}

export default ChatList