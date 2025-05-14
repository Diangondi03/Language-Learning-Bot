import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { IoSend } from 'react-icons/io5'

const InputSection = () => {
    const inputText = useSignal<string>("");
    useSignals()

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>)  => {
        const target = e.target as HTMLTextAreaElement;
        if (target && target.value.length <= 1000 && target.value.length >= 0) {
            inputText.value = target.value;
        }
    };
    const sendText = () => {
        if (inputText.value.trim() === "") return;
        inputText.value = "";
    }

    return (
        <div className="w-full h-[15vh] md:h-[20vh]   sticky bottom-0 bg-base-200 dark:bg-neutral-900 flex items-start gap-4 shadow-[0_-15px_10px_0_rgba(255,255,255,0.8)] dark:shadow-[0_-15px_10px_0_rgba(23,23,23,0.8)]">
            <textarea
            className="textarea w-full textarea-bordered text-md  resize-none rounded-3xl border-gray-400 focus:outline-0 p-4 dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-200"
            placeholder="Type your message here..."
            value={inputText.value}
            onInput={handleInput}
            rows={3}
            ></textarea>
            <button className={`btn ${inputText.value ? "btn-primary cursor-pointer" : "cursor-default bg-gray-200 text-gray-300 dark:bg-neutral-700 dark:text-neutral-800 dark:border-none dark:shadow-none"} btn-circle p-2 self-start`}
            onClick={sendText}>
            <IoSend/>
            </button>
        </div>
    )
}

export default InputSection