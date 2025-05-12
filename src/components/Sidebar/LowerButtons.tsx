import { TbLogout2, TbSettings2 } from "react-icons/tb"

const LowerButtons = () => {
    const clickLogout = () => {
        const modal = document.getElementById('logoutModal') as HTMLDialogElement | null;
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    }

    return (
        <div className="absolute bottom-5 w-fit flex flex-col gap-2 ">

            <li>
                <button className="btn btn-ghost justify-start w-full rounded-2xl">
                    <TbSettings2/>
                    Settings
                </button>
            </li>
            <li>
                <button className="btn btn-ghost justify-start w-full rounded-2xl" onClick={clickLogout}>
                    <TbLogout2/>
                    Log Out
                </button>
            </li>

        </div>
    )
}

export default LowerButtons