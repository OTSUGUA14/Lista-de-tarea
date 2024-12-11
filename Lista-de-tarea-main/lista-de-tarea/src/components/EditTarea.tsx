import React, { ChangeEvent, FC } from 'react'
import { TiTick } from 'react-icons/ti'
import { ITareas } from '../types/ITareas';
interface EditTarea extends ITareas {
    enviarTareaEditada: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleChange:  (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

}
const EditTarea: FC<EditTarea> = ({titulo,
    prioridad,
    enviarTareaEditada,handleChange})=>{
        return(
            <div className = "flex flex-row items-center justify-between" >
            <input
              className="text-2xl"
              value={titulo}
              onChange={handleChange}
              name="titulo"
            />
            <button className="text-xs ml-2" onClick={enviarTareaEditada}>
              <TiTick />
            </button>
        
            <select
              name="prioridad"
              value={prioridad}
              onChange={handleChange}
            >
              <option value="">ELEGI LA PRIORIDAD</option>
              <option value="baja">BAJA</option>
              <option value="media">MEDIA</option>
              <option value="alta">ALTA</option>
            </select>
          </div >
          )
    }
  


export default EditTarea
