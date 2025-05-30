import { useEffect, useRef } from "react"
import axiosInstance from "../axiosConfig"
import InputSection from "../components/Chat/InputSection"
import { chats, copied, deleteId, messages } from "../signals"
import { useSignals } from "@preact/signals-react/runtime"
import { useParams } from "react-router"
 


import { RiDeleteBin5Line} from "react-icons/ri"
import MessageBubble from "../components/Chat/MessageBubble"


const Chat = () => {
    const {chatId} = useParams()
    useSignals()
    const containerRef = useRef<HTMLDivElement>(null);
    

    const getMessages = async () => {
        try {
            const res = await axiosInstance.get('/message', {
                params: {
                    chatId
                }
            })
            messages.value = res.data
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMessages()
    }, [chatId])

    useEffect(() => {
        if (containerRef.current) {
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth"
        });
        }
      }, [messages.value.length]);

    const getChatIndex = () => {
        const index = chats.value.findIndex(chat => chat.chat_id === Number(chatId))
        return index
    }
    const clickDelete = () => {
        const modal = document.getElementById('deleteModal') as HTMLDialogElement | null;
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
            deleteId.value = Number(chatId)
        }
    }

  return (
    <>
    <div  className="w-full h-[calc(100vh-140px)] md:h-[75vh] flex flex-col">

        {chatId && 
            <button className="lg:hidden cursor-pointer z-1 right-4 top-4 absolute p-0" onClick={clickDelete}>

                <RiDeleteBin5Line className="text-red-500 "/>
            </button>
        }
        <div ref={containerRef} className="h-full flex flex-col gap-10  overflow-y-auto pb-10 pt-15">
            <h2 className="text-center">{chats.value[getChatIndex()]?.title}</h2>
            {messages.value.map( (message,index) => (
            
                <MessageBubble message={message} key={index}/> 
            ))}
        </div>


    </div>
        {
            copied.value &&
            <div className="toast toast-start toast-left z-100 w-full md:w-[25%] animate-fade-in-out animate-slide-out">
                <div className="alert animate-slide-in">
                    <span className="animate-fade-in">Text copied to clipboard.</span>
                </div>
            </div>
        }
        <InputSection/>
    </>
  )
}

export default Chat