import { TiDelete } from "react-icons/ti";

import { FC } from 'react'
import { ITareas } from '../types/ITareas'
interface CardTareaProps extends ITareas {
  onDelete: (id: string) => void;
}
const CardTarea: FC<CardTareaProps> = ({ titulo, prioridad,id ,onDelete}) => {
  const prioridadClase = prioridad.toLowerCase() === "alta"
  ? "bg-red-500"  // Si prioridad es "alta", asigna el fondo rojo
  : prioridad.toLowerCase() === "media"
  ? "bg-yellow-500"  // Si prioridad es "media", asigna el fondo amarillo
  : "bg-green-500"; // Si prioridad no es ni "alta" ni "media", asigna el fondo verde (se asume que es "baja")
  return (
    <div className={`flex  flex-row p-4  text-white ${prioridadClase} justify-between`} >
    
        <h3 className='text-2xl'>{titulo}</h3>
        <button value={id} onClick={()=>id && onDelete(id)} ><TiDelete/></button>
   
    </div>
  )
}

export default CardTarea
