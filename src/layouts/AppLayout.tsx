import { BiMenu } from "react-icons/bi"
import Sidebar from "../components/Sidebar/Sidebar"
import LogoutModal from "../components/Chat/LogoutModal"
import { Outlet, useNavigate } from "react-router"
import { useSignals } from "@preact/signals-react/runtime"
import { user } from "../signals"
import axiosInstance from "../axiosConfig"
import { useLayoutEffect } from "react"

import DeleteModal from "../components/Chat/DeleteModal"

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
        window.speechSynthesis.cancel()
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
        <div className="drawer-content max-h-screen flex flex-col items-center  bg-base-200 dark:bg-neutral-900 relative">
            <div className="h-12 w-full lg:hidden z-1 bg-inherit absolute">

            <label htmlFor="my-drawer-2" className="drawer-button  absolute  left-0 p-4 z-1 ">
                <BiMenu className="cursor-pointer"/>
                
            </label>
            </div>
            

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