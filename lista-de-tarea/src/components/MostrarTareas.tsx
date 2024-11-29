import React, { useEffect, useState } from 'react'
import { ITareas } from '../types/ITareas'

function MostrarTareas() {
    const[tareas,setTareas]=useState<ITareas[]>([])
    const traerTareas=async()=>{
        const rest =await fetch("http://localhost:3000/tareas")
        const restJson=await rest.json()
        setTareas(restJson)

      }
      useEffect(() => {
        traerTareas()
      }, [])
  return (
      <>
    <h1>Lista de tarea</h1>
    {tareas.map((tarea)=>(
      <>
      
      <h2>{tarea.titulo}</h2>
      <h2>{tarea.prioridad}</h2>
      </>
    ))}
    </>
  )
}

export default MostrarTareas