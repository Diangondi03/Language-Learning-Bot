import { BiMenu, BiPlus } from "react-icons/bi"
import InputSection from "../components/Home/InputSection"
import Sidebar from "../components/Sidebar/Sidebar"

const Home = () => {
  return (
    <>

    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center  bg-base-200">
            <label htmlFor="my-drawer-2" className="drawer-button h-fit p-2 lg:hidden absolute top-4 left-4">
                <BiMenu/>
            </label>
            
            <div className="w-[90%] md:w-[75%]   mt-20 flex flex-col">

                {Array.from({ length: 20 }, (_) => (
                    <>
                    
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea dolore reprehenderit accusantium sapiente aliquam, distinctio nihil dolorem perferendis labore molestiae culpa neque, eaque eius eos? Dolore quaerat aspernatur sint velit?
                    
                    <div className=" bg-gray-200 my-10 self-end p-3 w-fit rounded-2xl rounded-tr-none">You underestimate my power!</div>
                    </>
                ))}
            </div>
            <InputSection/>
        </div>
        <Sidebar/>
    </div>

    </>
  )
}

export default Home