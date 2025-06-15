import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { IoSend } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../axiosConfig';
import { messages,chats, pendingMessage} from '../../signals';
import { useEffect } from 'react';

const InputSection = () => {

    const {chatId} = useParams()
    const navigate = useNavigate()
    const inputText = useSignal<string>("");
    const responding = useSignal<boolean>(false)
    
    useSignals()

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>)  => {
        const target = e.target as HTMLTextAreaElement;
        if (target && target.value.length <= 1000 && target.value.length >= 0) {
            inputText.value = target.value;
        }
    };

    const generateGeminiResponse = async ()=>{
        try{

            const history = messages.value.map((message)=>{
                return {role:message.is_user ? "user" : "model",parts:[{text:message.content}]}
            })
            const resGemini = await axiosInstance.post("/gemini", { prompt: pendingMessage.value.message,history});
            pendingMessage.value.message = ""
            pendingMessage.value.id = 0
            const geminiMessage = {
                content: resGemini.data.text,
                chatId,
                is_user:false
            }
            const geminiMessageRes = await axiosInstance.post('/message', geminiMessage)
            messages.value =  [...messages.value, geminiMessageRes.data]
        } catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        if(Number(chatId) == pendingMessage.value.id){

            generateGeminiResponse()
        }
    },[chatId])


    const sendText = async () => {
        if (inputText.value && inputText.value.trim()!==''){
            responding.value = true
            try{
                if(messages.value.length==0){
                    const resTitle = await axiosInstance.post("/gemini/title",{message:inputText.value.trim()})
                    const resNewchat = await axiosInstance.post("/chat",{title:resTitle.data.title})
                    chats.value = [resNewchat.data,...chats.value]
                    await axiosInstance.post("/message",{content:inputText.value.trim(),chatId:resNewchat.data.chat_id,is_user:true})
                    pendingMessage.value.message = inputText.value.trim()
                    pendingMessage.value.id = resNewchat.data.chat_id
                    inputText.value = "";
                    navigate(`/app/${resNewchat.data.chat_id}`)
                }
                else{
                    
                    
                    const message = {
                        content: inputText.value.trim(),
                        chatId,
                        is_user: true
                    }

                    const res = await axiosInstance.post('/message', message)
                    messages.value =  [...messages.value, res.data]
                    
                    
                    
                    inputText.value = "";
                    pendingMessage.value.message = res.data.content
                    pendingMessage.value.id = Number(chatId)
                    generateGeminiResponse()
                    
                }
            }
            catch (error){
                console.error(error);
            }
            finally{
                responding.value = false
            }
        }
    }

    return (
        <div className="w-[100%] h-35 md:h-[25vh]  bg-base-200 dark:bg-neutral-900 flex items-start justify-center relative m-0">
            <div className=" absolute top-0  h-10 w-[90%] md:w-[75%] shadow-[0_-15px_10px_0_rgba(255,255,255,0.8)] dark:shadow-[0_-15px_10px_0_rgba(23,23,23,0.8)]"></div>
            <div className='relative w-[90%] md:w-[75%]'>

            <textarea
            disabled={responding.value}
            className=" textarea w-full relative textarea-bordered text-md pr-20 resize-none rounded-3xl border-gray-400 focus:outline-0 p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-200 disabled:bg-neutral-200 disabled:dark:bg-neutral-900 disabled:border-gray-400 disabled:dark:border-neutral-700"
            placeholder="Type your message here..."
            value={inputText.value}
            onInput={handleInput}
            rows={4}
            >


            </textarea>
            <button className={`absolute right-5 bottom-5 btn ${(inputText.value && inputText.value.trim()!=='' && !responding.value) ? "btn-primary cursor-pointer" : "cursor-default bg-gray-200 text-gray-300 dark:bg-neutral-700 dark:text-neutral-800 dark:border-none dark:shadow-none"} btn-circle p-2 self-start`}
            onClick={sendText}>
            <IoSend/>
            </button>
            </div>

        </div>
    )
}

export default InputSection