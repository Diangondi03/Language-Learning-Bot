import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { IoSend } from 'react-icons/io5'
import { useParams } from 'react-router';
import axiosInstance from '../../axiosConfig';
import { messages } from '../../signals';

const InputSection = () => {

    const {chatId} = useParams()
    const inputText = useSignal<string>("");
    useSignals()

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>)  => {
        const target = e.target as HTMLTextAreaElement;
        if (target && target.value.length <= 1000 && target.value.length >= 0) {
            inputText.value = target.value;
        }
    };



    const sendText = async () => {
        try{

            if (inputText.value && inputText.value.trim()!=='') {
                const message = {
                content: inputText.value.trim(),
                chatId,
                is_user: true
                }
                const history = messages.value.map((message)=>{
                    return {role:message.is_user ? "user" : "model",parts:[{text:message.content}]}
                })
                const res = await axiosInstance.post('/message', message)
                messages.value =  [...messages.value, res.data]

                
                
                inputText.value = "";
                const resGemini = await axiosInstance.post("/gemini", { prompt: res.data.content,history});
                const geminiMessage = {
                    content: resGemini.data.text,
                    chatId,
                    is_user:false
                }
                const geminiMessageRes = await axiosInstance.post('/message', geminiMessage)
                messages.value =  [...messages.value, geminiMessageRes.data]
            }
        }
        catch (error){
            console.error(error);
        }
    }

    return (
        <div className="w-[100%] h-[20vh] md:h-[25vh]  bg-base-200 dark:bg-neutral-900 flex items-start justify-center shadow-[0_-15px_10px_0_rgba(255,255,255,0.8)] dark:shadow-[0_-15px_10px_0_rgba(23,23,23,0.8)]">
            <div className='relative w-[90%] md:w-[75%]'>

            <textarea
            className="textarea w-full relative textarea-bordered text-md pr-20 resize-none rounded-3xl border-gray-400 focus:outline-0 p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-200"
            placeholder="Type your message here..."
            value={inputText.value}
            onInput={handleInput}
            rows={4}
            >


            </textarea>
            <button className={`absolute right-5 bottom-5 btn ${(inputText.value && inputText.value.trim()!=='') ? "btn-primary cursor-pointer" : "cursor-default bg-gray-200 text-gray-300 dark:bg-neutral-700 dark:text-neutral-800 dark:border-none dark:shadow-none"} btn-circle p-2 self-start`}
            onClick={sendText}>
            <IoSend/>
            </button>
            </div>

        </div>
    )
}

export default InputSection