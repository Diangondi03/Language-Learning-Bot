import { useEffect, useRef } from "react"
import axiosInstance from "../axiosConfig"
import InputSection from "../components/Home/InputSection"
import { chats, messages } from "../signals"
import { useSignals } from "@preact/signals-react/runtime"
import { useParams } from "react-router"
import { marked } from 'marked'; 

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

  return (
    <>
    <div  className="w-full h-[80vh] md:h-[75vh] flex flex-col">

        <div ref={containerRef} className="min-h-[75vh] h-[75vh] flex justify-center flex-col gap-10  overflow-y-auto">
            <h2 className="text-center">{chats.value[0]?.title}</h2>
        {messages.value.map( (message) => (
            !message.is_user ?
            

                <p dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }} className="text-left my-5 ml-[10%] md:ml-[15%] mr-[5%] md:mr-[12.5%]">
                    
                </p>
                :
            
            <div className="bg-gray-200 dark:bg-neutral-600 mr-[5%] md:mr-[12.5%] self-end p-3 w-fit max-w-[70%] break-words rounded-2xl rounded-tr-none my-5">
                {message.content}
            </div>
        ))}
        </div>


    </div>
        <InputSection/>
    </>
  )
}

export default Chat