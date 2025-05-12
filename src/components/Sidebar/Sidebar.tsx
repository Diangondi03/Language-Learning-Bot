
import { IoCreateOutline } from "react-icons/io5"
import ChatList from "./ChatList"
import LowerButtons from "./LowerButtons"

const Sidebar = () => {
    
  return (
    <div className="drawer-side ">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu pl-4 pr-0 w-70 min-h-full text-gray-900 bg-gray-100">
            <li className="my-3">
                <button className="btn btn-ghost justify-start rounded-2xl bg-blue-300 w-fit flex items-center gap-2">
                    <IoCreateOutline size={20}/>
                    New Chat
                </button>
            </li>

            <ChatList/>

            <LowerButtons/>
            
            
        </ul>
    </div>
  )
}

export default Sidebar