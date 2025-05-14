import { useSignals } from "@preact/signals-react/runtime"
import { theme } from "../signals"

const Settings = () => {
  useSignals()
  const setTheme =()=>{
    document.body.classList.toggle('dark')
    if(document.body.classList.contains('dark')){
      localStorage.setItem('theme', 'dark')
      theme.value = 'dark'
    }
    else{
      localStorage.setItem('theme', 'light')
      theme.value = 'light'
    }
  }
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center  my-5">Settings</h1>
      <div className="flex items-center gap-3">

      <h2 className="text-2xl text-center my-5 ">Theme</h2>
      <input type="checkbox" checked={theme.value=='dark'} className="toggle theme-controller" onClick={setTheme}/>
      </div>
    </div>
  )
}

export default Settings