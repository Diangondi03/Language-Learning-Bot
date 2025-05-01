import { Outlet, useLocation } from "react-router"
import Footer from "../components/Footer"
import { signal} from "@preact/signals"

export const currentPath = signal<string>("")
const AuthLayout = () => {
    const location = useLocation(); 
    currentPath.value = location.pathname; 
    
    return (
        <>
            <div className="flex flex-row justify-between min-h-screen mb-[10vh]">
                <div className={`${currentPath.value=="/auth/login" ? "bg-blue-500" : "bg-green-500"} min-h-screen w-1/2 hidden lg:block`}></div>
                    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4 w-full lg:w-1/2">
                      <h1 className="text-4xl font-bold text-center mb-6">{currentPath.value==="/auth/login" ? "Login" : "Signup"}</h1>
                      <div className="card w-full max-w-sm shadow-2xl bg-base-100"> 
                        <div className="card-body">
                            <Outlet/>
                          
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
  )
}

export default AuthLayout