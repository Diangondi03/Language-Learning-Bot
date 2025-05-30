import { useNavigate } from "react-router"

const LogoutModal = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/auth/login')
    }
    return (
        <dialog id="logoutModal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box dark:bg-neutral-800">
                <p className="py-4">Are you sure you want to log out?</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-error mx-2" onClick={handleLogout}>Logout</button>
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default LogoutModal