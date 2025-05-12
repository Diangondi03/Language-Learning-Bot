import { useSignal } from "@preact/signals-react"
import { useSignals } from "@preact/signals-react/runtime"
import { IoMdMore } from "react-icons/io"
import { IoCreateOutline } from "react-icons/io5"
import { RiDeleteBin5Line } from "react-icons/ri"
import { TbLogout2, TbSettings2 } from "react-icons/tb"

const Sidebar = () => {
    const indexSidebar = useSignal(0)
    useSignals()
  return (
    <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu pl-4 pr-0 w-70 min-h-full text-gray-900">
            <li className="my-3">
                <button className="btn btn-ghost justify-start rounded-2xl bg-blue-300 w-fit flex items-center gap-2">
                    <IoCreateOutline size={20}/>
                    New Chat
                </button>
            </li>
            <div className="max-h-[65vh] overflow-y-auto flex flex-col gap-2 no-scrollbar">

                {Array.from({ length: 30 }, (_, i) => (
                    <li key={i} className="group relative">
                        <button
                            className={`btn btn-ghost justify-start w-full rounded-2xl overflow-hidden text-ellipsis whitespace-nowrap flex items-center ${indexSidebar.value === i ? "bg-blue-100 text-blue-800" : ""}`}
                            onClick={() => indexSidebar.value = i}
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
            <div className="absolute bottom-5 w-fit flex flex-col gap-2 ">

            <li>
                <button className="btn btn-ghost justify-start w-full rounded-2xl">
                    <TbSettings2/>
                    Settings
                </button>
            </li>
            <li>
                <button className="btn btn-ghost justify-start w-full rounded-2xl">
                    <TbLogout2/>
                    Log Out
                </button>
            </li>
            </div>
        </ul>
    </div>
  )
}

export default Sidebar