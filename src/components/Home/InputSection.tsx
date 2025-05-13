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
        <div className="w-full h-[15vh] pb-[5vh] sticky bottom-0 bg-base-200 flex items-center justify-center gap-4 shadow-[0_-15px_10px_0_rgba(255,255,255,0.7)]">
            <textarea
            className="textarea w-full textarea-bordered text-md  resize-none rounded-3xl border-gray-400 focus:outline-0 p-4"
            placeholder="Type your message here..."
            value={inputText.value}
            onInput={handleInput}
            rows={3}
            ></textarea>
            <button className={`btn btn-primary ${inputText.value ? "" : "btn-disabled"} btn-circle p-2 self-start`}
            onClick={sendText}>
            <IoSend/>
            </button>
        </div>
    )
}

export default InputSection