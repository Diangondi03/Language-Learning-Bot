
import InputSection from "../components/Home/InputSection"
import { user } from "../signals"
import { useSignals } from "@preact/signals-react/runtime"

const Home = () => {
    useSignals()
    


  return (
    <>
    <div className="w-[90%] md:w-[75%] h-full flex flex-col">

        <div className="min-h-[75vh] h-[75vh] flex justify-center  flex-col gap-5">
            <h2 className="text-center text-3xl font-bold">{"Hello " + user.value.username}</h2>
        
        </div>


    </div>
        <InputSection/>
    </>
  )
}

export default Home