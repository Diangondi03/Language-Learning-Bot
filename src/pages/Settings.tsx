
import ThemeSection from "../components/Settings/ThemeSection";
import UpdateForm from "../components/Settings/UpdateForm";
import { indexSidebar } from "../signals";



const Settings = () => {
  indexSidebar.value = 0

  
  return (
    <div className="flex flex-col items-center overflow-auto w-full h-screen pb-5 mt-15 lg:mt-0">
      <h1 className="font-bold text-3xl text-center  my-5">Settings</h1>
      <ThemeSection/>
      <UpdateForm/>
    </div>
  )
}

export default Settings