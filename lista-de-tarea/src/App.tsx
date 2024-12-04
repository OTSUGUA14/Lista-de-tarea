import { useEffect, useState } from 'react'
import './App.css'
import { ITareas } from './types/ITareas'
import CardTarea from './components/CardTarea'
import AddTarea from './components/AddTarea'
import { DELETE } from './services/peticiones'



function App() {

  // const[values,setValues]=useState<ITareas>({ titulo:"",prioridad:""})
  const [tareas, setTareas] = useState<ITareas[]>([])

  const traerTareas = async () => {
    const rest = await fetch("http://localhost:3000/tareas")
    const restJson = await rest.json()
    setTareas(restJson)

  }
  const agregarTarea = (nuevaTarea: ITareas) => {
    setTareas((prevTareas) => [...prevTareas, nuevaTarea])
  }

  useEffect(() => {
    traerTareas()
  }, [AddTarea])

  const eliminarTarea = async (id: string) => {
    try {
      await DELETE<{ success: boolean }>(`http://localhost:3000/tareas/${id}`);
      setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== id)); // Actualizar la lista localmente
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };
  return (
    <main>

      <div className='border-4 rounded-md'>
        <div className='flex flex-col items-center justify-center p-12  h-20 bg-slate-400 ' >
          <h1>Lista de tarea</h1>
        </div>
        {tareas.map((tarea) => (
          <CardTarea
            titulo={tarea.titulo}
            prioridad={tarea.prioridad}
            id={tarea.id}
            onDelete={eliminarTarea}
          />
        ))}
      </div>

      <AddTarea onAddTarea={agregarTarea} />

    </main>
  )
}

export default App
