import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ITareas } from './types/ITareas'
import MostrarTareas from './components/mostrarTareas'

function App() {
  const [count, setCount] = useState(0)
  const[values,setValues]=useState<ITareas>({ titulo:"",prioridad:""})

  
  
  
  return (
    <>
    <MostrarTareas/>

    
    </>
  )
}

export default App
