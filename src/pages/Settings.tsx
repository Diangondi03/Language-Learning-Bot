
import ThemeSection from "../components/Settings/ThemeSection";
import UpdateForm from "../components/Settings/UpdateForm";



const Settings = () => {


  
  return (
    <div className="flex flex-col items-center overflow-auto w-full h-screen pb-5">
      <h1 className="font-bold text-3xl text-center  my-5">Settings</h1>
      <ThemeSection/>
      <UpdateForm/>
    </div>
  )
}

export default Settings