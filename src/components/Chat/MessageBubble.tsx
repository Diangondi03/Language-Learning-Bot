import { RiRobot3Line } from 'react-icons/ri'
import { marked } from 'marked';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { copied, currentPlayingId } from '../../signals';
import { BiCopy } from 'react-icons/bi';
import { HiPause, HiPlay } from 'react-icons/hi2';
import { Message } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

// Create a signal to track the currently playing message ID

const MessageBubble = ({message}:{message:Message}) => {
    useSignals()
    const {chatId} = useParams()
    const played = useSignal<boolean>(false)
    const isSpeaking = useSignal<boolean>(false)
    

    const [isPaused, setIsPaused] = useState(false)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

    const playMessage = () => {
        if (!("speechSynthesis" in window)) return;

        // If another message is playing, stop it
        if (currentPlayingId.value && currentPlayingId.value !== message.message_id) {
            window.speechSynthesis.cancel();
            isSpeaking.value = false
            played.value = false
            setIsPaused(false)
            currentPlayingId.value = null
        }

        if (isSpeaking.value && currentPlayingId.value === message.message_id) {
            // If this message is speaking, pause or resume
            if (isPaused) {
                window.speechSynthesis.resume();
                setIsPaused(false);
            } else {
                window.speechSynthesis.pause();
                setIsPaused(true);
            }
            return;
        }

        // If not speaking, start new speech
        window.speechSynthesis.cancel();
        // Strip markdown formatting for speech
        const plainText = message.content.replace(/[*_`#]/g, '');
        const utterance = new window.SpeechSynthesisUtterance(plainText);
        utterance.pitch = 1.75
    
        utterance.onend = () => {
            isSpeaking.value = false;
            played.value = false;
            setIsPaused(false);
            currentPlayingId.value = null;
        };
    
        utterance.onpause = () => setIsPaused(true);
        utterance.onresume = () => setIsPaused(false);
    
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        isSpeaking.value = true;
        played.value = true;
        currentPlayingId.value = message.message_id;
    }

    useEffect(()=>{
        window.speechSynthesis.cancel();
        isSpeaking.value = false
        played.value = false
        setIsPaused(false)
        currentPlayingId.value = null
    },[chatId])

    useEffect(()=>{
        if(currentPlayingId.value!=message.message_id && currentPlayingId.value!=null){
            
            isSpeaking.value = false
            played.value = false
            setIsPaused(false)
            
        }
    },[currentPlayingId.value])
    
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
                    {!isPaused && played.value ?
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
