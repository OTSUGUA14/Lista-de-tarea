import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ITareas } from "../types/ITareas";
import { POST } from "../services/peticiones";
interface FormTarea {
  onAddTarea: (nuevaTarea: ITareas) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FormTarea: React.FC<FormTarea> = ({ onAddTarea, setOpen }) => {
  const [values, setValues] = useState<ITareas>({ titulo: "", prioridad: "" });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    await POST<ITareas>("http://localhost:3000/tareas", values);
    onAddTarea(values);
    setValues({ titulo: "", prioridad: "" });
    setOpen(!open);
  };
  return (
    <div className="inset-0 bg-black/40 fixed h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col justify-center items-center w-64 rounded p-4">
        <label>
          <input
            type="text"
            value={values.titulo}
            onChange={handleChange}
            name="titulo"
            placeholder="agrega al titulo de la tarea"
          />
        </label>
        <label>
          <select
            name="prioridad"
            value={values.prioridad}
            onChange={handleChange}
          >
            <option value="">ELEGI LA PRIORIDAD</option>
            <option value="baja">BAJA</option>
            <option value="media">MEDIA</option>
            <option value="alta">ALTA</option>
          </select>
        </label>

        <button onClick={handleSubmit}>CREAR TAREA</button>
        <button onClick={() => setOpen(false)}>CANCELAR</button>
      </div>
    </div>
  );
};

export default FormTarea;
