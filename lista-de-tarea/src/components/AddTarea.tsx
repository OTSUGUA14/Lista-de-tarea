import React, { ChangeEvent, useRef, useState } from 'react'
import { ITareas } from '../types/ITareas'
import { POST } from '../services/peticiones';


interface AddTareaProps {
    onAddTarea: (nuevaTarea: ITareas) => void; 
}

const AddTarea: React.FC<AddTareaProps> = ({ onAddTarea }) => {

    const [values, setValues] = useState<ITareas>({ titulo: "", prioridad: "" })
    const containerAddTarea=useRef<HTMLDivElement | null>(null)
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prevData) => ({
            ...prevData,
            [name]: value, // Actualiza el campo correspondiente
        }));
    };

    const handleSubmit = async () => {
        if (values.titulo == "" || values.prioridad == "") {
            alert("Por favor complete todos los campos.");
            return;
        }
        await POST<ITareas>("http://localhost:3000/tareas", values)
        onAddTarea(values)
        setValues({ titulo: "", prioridad: "" });
        if (containerAddTarea.current) {
            containerAddTarea.current.style.display = "none"; // Ocultar el contenedor usando el ref
        }
    }
    const mostrar = () => { 
        if (containerAddTarea.current) {
            console.log("Si");
            containerAddTarea.current.style.display = "flex"; // Ocultar el contenedor usando el ref
        }
    }

    return (
        <div className='flex flex-col '>
            <button onClick={mostrar}>agregar una nueva tarea</button>
            <div id='addTarea' className='flex flex-col' ref={containerAddTarea}  style={{ display: 'none' }}>
                <label>

                    <input type="text" value={values.titulo} onChange={handleChange} name='titulo' placeholder='agrega al titulo de la tarea' />
                </label>
                <label>
                    <select name='prioridad' value={values.prioridad} onChange={handleChange} >
                        <option value="">ELEGI LA PRIORIDAD</option>
                        <option value="baja">BAJA</option>
                        <option value="media">MEDIA</option>
                        <option value="alta">ALTA</option>
                    </select>
                </label>


                <button onClick={handleSubmit}>CREAR TAREA</button>
            </div>

        </div>
    )
}

export default AddTarea
