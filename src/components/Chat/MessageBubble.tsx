import { RiRobot3Line } from 'react-icons/ri'
import { marked } from 'marked';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { copied } from '../../signals';
import { BiCopy } from 'react-icons/bi';
import { HiPause, HiPlay } from 'react-icons/hi2';
import { Message } from '../../interfaces';
import { speak } from '../../speak';

const MessageBubble = ({message}:{message:Message}) => {
    useSignals()
    const played = useSignal<boolean>(false)
    const isSpeaking = useSignal<boolean>(false)
    const playMessage = ()=>{
        if (!("speechSynthesis" in window)) return;

        if (!isSpeaking) {
          window.speechSynthesis.cancel();
          const utterance = new window.SpeechSynthesisUtterance(message.content);
      
          // Listen for when the speech ends
          utterance.onend = () => {
            isSpeaking.value = false
            played.value = false
            // You can do anything here, e.g., update UI, play next message, etc.
          };
      
          utterance.onpause = () => setIsPaused(true);
          utterance.onresume = () => setIsPaused(false);
      
          utteranceRef.current = utterance;
          window.speechSynthesis.speak(utterance);
          isSpeaking.value = false
          played.value = false
        }
    }
    
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
                <button className="btn btn-circle cursor-pointer" onClick={playMessage}>
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
