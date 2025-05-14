import { useSignal, useSignals } from "@preact/signals-react/runtime";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router";

const ChatList = () => {
    const indexSidebar = useSignal(0)
    const navigate = useNavigate()
    useSignals()
  return (
    <div className="max-h-[65vh] overflow-y-auto flex flex-col gap-2 no-scrollbar">

        {Array.from({ length: 30 }, (_, i) => (
            <li key={i} className="group relative">
                <button
                    className={`btn btn-ghost justify-start w-full rounded-2xl overflow-hidden text-ellipsis whitespace-nowrap flex items-center border-none ${indexSidebar.value === i ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-white" : "dark:hover:bg-neutral-600 dark:hover:text-white dark:hover:shadow-none"}`}
                    onClick={()=>{
                        navigate("/app")
                    }}
                >
                    <span className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                        Sidebar {i + 1}
                    </span>
                    
                    <button
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 p-1 rounded-full hover:bg-red-100 cursor-pointer"
                        onClick={e => {
                            e.stopPropagation();
                            indexSidebar.value +=1; // Remove the item from the list
                        }}
                        tabIndex={-1}
                    >
                        <RiDeleteBin5Line/>
                    </button>
                </button>
            </li>
        ))}
    </div>
  )
}

export default ChatList