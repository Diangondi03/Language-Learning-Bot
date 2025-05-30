import { useSignals } from "@preact/signals-react/runtime"
import { theme } from "../../signals"

const ThemeSection = () => {

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
  console.log(theme)

  return (
    <div className="flex items-center gap-5">
    
          <h2 className="text-2xl text-center my-5 ">Theme</h2>
          <input type="checkbox" checked={theme.value=='dark'} className="toggle theme-controller" onChange={setTheme}/>
    </div>
  )
}

export default ThemeSection