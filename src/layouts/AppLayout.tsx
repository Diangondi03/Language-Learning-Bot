import { BiMenu } from "react-icons/bi"
import Sidebar from "../components/Sidebar/Sidebar"
import LogoutModal from "../components/Home/LogoutModal"
import { Outlet, useNavigate } from "react-router"
import { useSignals } from "@preact/signals-react/runtime"
import { user } from "../signals"
import axiosInstance from "../axiosConfig"
import { useLayoutEffect } from "react"
import { MdDelete } from "react-icons/md"
import DeleteModal from "../components/Home/DeleteModal"

const AppLayout = () => {

    const navigate = useNavigate()
    useSignals()
    const getUser = async () => {
        try{

            const res = await axiosInstance.get('/user')
            user.value = res.data
        }
        catch (error) {
            navigate('/auth/login')
        }
    }

    useLayoutEffect(() => {
        const theme = localStorage.getItem('theme')
        if(theme && theme==='dark'){
            document.body.classList.add('dark')
        }

        getUser()
    }, [])
    if (!user.value) {
        return <></>
    }


  return (
    <>
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center  bg-base-200 dark:bg-neutral-900 ">
            <label htmlFor="my-drawer-2" className="drawer-button h-fit w-full absolute top-0 lg:hidden bg-inherit left-0 p-4 z-1 ">
                <BiMenu className="cursor-pointer"/>
                
            </label>
            

                <Outlet/>
        </div>
        <Sidebar/>
        <LogoutModal/>
        <DeleteModal/>
    </div>

    </>
  )
}

export default AppLayout