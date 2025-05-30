import { RiRobot3Line } from 'react-icons/ri'
import { marked } from 'marked';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { copied } from '../../signals';
import { BiCopy } from 'react-icons/bi';
import { HiPause, HiPlay } from 'react-icons/hi2';
import { Message } from '../../interfaces';

const MessageBubble = ({message}:{message:Message}) => {
    useSignals()
    const played = useSignal<boolean>(false)
    
  return (
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
  )
}

export default MessageBubble
