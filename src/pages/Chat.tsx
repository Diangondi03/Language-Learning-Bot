import { useEffect, useRef } from "react"
import axiosInstance from "../axiosConfig"
import InputSection from "../components/Home/InputSection"
import { chats, deleteId, messages } from "../signals"
import { useSignal, useSignals } from "@preact/signals-react/runtime"
import { useParams } from "react-router"
import { marked } from 'marked'; 
import { BiCopy } from "react-icons/bi"
import { HiPlay,HiPause } from "react-icons/hi2"

import { RiDeleteBin5Line, RiRobot3Line } from "react-icons/ri"


const Chat = () => {
    const {chatId} = useParams()
    useSignals()
    const containerRef = useRef<HTMLDivElement>(null);
    const copied = useSignal<boolean>(false)
    const played = useSignal<boolean>(false)
    const getMessages = async () => {
        try {
            const res = await axiosInstance.get('/message', {
                params: {
                    chatId
                }
            })
            messages.value = res.data
            console.log(messages.value)
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

    <button className="lg:hidden cursor-pointer z-1 right-4 top-4 absolute p-0" onClick={clickDelete}>

        <RiDeleteBin5Line className="text-red-500 "/>
    </button>
        <div ref={containerRef} className="h-full flex flex-col gap-10  overflow-y-auto pb-10 pt-15">
            <h2 className="text-center">{chats.value[getChatIndex()]?.title}</h2>
            {messages.value.map( (message) => (
            
                !message.is_user ?
                
                    <div className="text-left text-md md:text-lg my-5  mx-[5%] md:mx-[12.5%] ">
                        <div className="flex flex-col items-start md:flex-row gap-3">
                            <RiRobot3Line className=" text-blue-300 flex-shrink-0" size={"1.5em"}/>
                            <p dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }} className="space-y-3">
                            
                            </p>
                        </div>
                        <div className="flex gap-5 my-5 md:ml-[5%]">
                            <div className="tooltip tooltip-bottom" data-tip="Copy text">

                                <button className="btn btn-circle cursor-pointer" onClick={()=>{
                                    navigator.clipboard.writeText(message.content)
                                    copied.value = true
                                    setTimeout(()=>{
                                        copied.value = false
                                    }, 3000)
                                }}>
                                    <BiCopy/>
                                </button>
                            </div>
                            <div className="tooltip tooltip-bottom" data-tip="Play audio">
                                <button className="btn btn-circle cursor-pointer" onClick={()=>{played.value = !played.value}}>
                                    {played.value ?
                                        <HiPause/> :
                                        <HiPlay/>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                
                <div className="bg-gray-200 dark:bg-neutral-600 mr-[5%] md:mr-[12.5%] self-end p-3 w-fit max-w-[70%] break-words rounded-2xl rounded-tr-none my-5">
                    {message.content}
                </div>
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