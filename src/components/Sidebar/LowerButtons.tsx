import { TbLogout2, TbSettings2 } from "react-icons/tb"
import { useNavigate } from "react-router";

const LowerButtons = () => {
    const navigate = useNavigate()
    const clickLogout = () => {
        const modal = document.getElementById('logoutModal') as HTMLDialogElement | null;
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }
    const clickSettings = () =>{
        if (window.location.pathname !== '/app/settings') {
            navigate('/app/settings')
        }
        if (window.innerWidth < 1024) {
            // User width is less than 1024
            document.getElementById('my-drawer-2')?.click()
        }
    }

    return (
        <div className="absolute bottom-5 w-fit flex flex-col gap-2">

            <li>
                <button className="btn btn-ghost justify-start w-full rounded-2xl dark:hover:bg-neutral-700 dark:hover:text-white" onClick={clickSettings}>
                    <TbSettings2/>
                    Settings
                </button>
            </li>
            <li>
                <button className="btn btn-ghost justify-start w-full rounded-2xl dark:hover:bg-neutral-700 dark:hover:text-white" onClick={clickLogout}>
                    <TbLogout2/>
                    Log Out
                </button>
            </li>

        </div>
    )
}

export default LowerButtons