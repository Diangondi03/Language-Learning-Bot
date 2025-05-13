import { BiMenu } from "react-icons/bi"
import Sidebar from "../components/Sidebar/Sidebar"
import LogoutModal from "../components/Home/LogoutModal"
import { Outlet, useNavigate } from "react-router"
import { useSignals } from "@preact/signals-react/runtime"
import { user } from "../signals"
import axiosInstance from "../axiosConfig"
import { useLayoutEffect } from "react"

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
        getUser()
    }, [])
    if (!user.value) {
        return <></>
    }


  return (
    <>
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center  bg-base-200 ">
            <label htmlFor="my-drawer-2" className="drawer-button h-fit p-2 lg:hidden absolute top-4 left-4">
                <BiMenu/>
            </label>
            
            <div className="w-[90%] md:w-[75%] h-full mt-[5vh] flex flex-col">

                <Outlet/>
            </div>
        </div>
        <Sidebar/>
        <LogoutModal/>
    </div>

    </>
  )
}

export default AppLayout