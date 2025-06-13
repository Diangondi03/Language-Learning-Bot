
import { IoCreateOutline } from "react-icons/io5"
import ChatList from "./ChatList"
import LowerButtons from "./LowerButtons"
import { useNavigate } from "react-router"

const Sidebar = () => {
  const navigate = useNavigate()
  const clickNewChat = () => {
    navigate("/app")
  }

  return (
    <div className="drawer-side ">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu pl-4 pr-0 w-70 min-h-full text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-neutral-800 z-50">
            <li className="my-3">
                <button onClick={clickNewChat} className="btn btn-ghost justify-start rounded-2xl bg-blue-300 hover:bg-blue-400 w-fit flex items-center gap-2 shadow-none border-none hover:text-inherit">
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