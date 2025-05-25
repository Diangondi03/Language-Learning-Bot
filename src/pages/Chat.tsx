import { useEffect, useRef } from "react"
import axiosInstance from "../axiosConfig"
import InputSection from "../components/Home/InputSection"
import { chats, messages } from "../signals"
import { useSignal, useSignals } from "@preact/signals-react/runtime"
import { useParams } from "react-router"
import { marked } from 'marked'; 
import { BiCopy } from "react-icons/bi"
import { HiPlay } from "react-icons/hi2"

const Chat = () => {
    const {chatId} = useParams()
    useSignals()
    const containerRef = useRef<HTMLDivElement>(null);
    const copied = useSignal<boolean>(false)
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

  return (
    <>
    <div  className="w-full h-[80vh] md:h-[75vh] flex flex-col">


        <div ref={containerRef} className="min-h-[75vh] h-[75vh] flex flex-col gap-10  overflow-y-auto py-10">
            <h2 className="text-center">{chats.value[getChatIndex()]?.title}</h2>
            {messages.value.map( (message) => (
            
                !message.is_user ?
                
                    <div className="text-left text-md md:text-lg my-5 ml-[10%] md:ml-[15%] mr-[5%] md:mr-[12.5%]">
                        <p dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }} className="space-y-3">
                            
                        </p>
                        <div className="flex gap-5 my-5">
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
                                <button className="btn btn-circle cursor-pointer">
                                    <HiPlay/>
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