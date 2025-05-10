import { IoCreateOutline } from "react-icons/io5"

const Sidebar = () => {
  return (
    <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-70 min-h-full text-gray-900">
            <li className="my-3">
                <button className="btn btn-ghost justify-start rounded-2xl bg-blue-300 w-fit flex items-center gap-2">
                    <IoCreateOutline size={20}/>
                    New Chat
                </button>
            </li>
            <div className="max-h-[65vh] overflow-y-auto flex flex-col gap-2">

                {Array.from({ length: 30 }, (_, i) => (
                    <li key={i} >
                        <button className="btn btn-ghost justify-start w-full rounded-2xl overflow-hidden text text-ellipsis whitespace-nowrap">
                            Sidebar {i + 1}
                        </button>
                    </li>
                ))}
            </div>
            <div className="absolute bottom-5 w-fit flex flex-col gap-2 ">

            <li><button className="btn btn-ghost justify-start w-full rounded-2xl">Settings</button></li>
            <li><button className="btn btn-ghost justify-start w-full rounded-2xl">Log Out</button></li>
            </div>
        </ul>
    </div>
  )
}

export default Sidebar