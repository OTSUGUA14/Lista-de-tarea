import { TiDelete } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { ITareas } from "../types/ITareas";
import { TiTick } from "react-icons/ti";
import { PATCH } from "../services/peticiones";
import EditTarea from "./EditTarea";
interface CardTareaProps extends ITareas {
  onDelete: (id: string) => void;
  setTareas: Dispatch<SetStateAction<ITareas[]>>;
} 

const CardTarea: FC<CardTareaProps> = ({
  titulo,
  prioridad,
  id,
  onDelete,
  setTareas,
}) => {
  const [valor, setEditValor] = useState<ITareas>({
    titulo: titulo,
    prioridad: prioridad,
  });

  const [estado, setEstado] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditValor((prevData) => ({
      ...prevData,
      [name]: value, // Actualiza el campo correspondiente
    }));
  };

  const editarTarea = (nuevaTarea: ITareas) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === nuevaTarea.id ? { ...tarea, ...nuevaTarea } : tarea
      )
    );
  };

  const onEdit = () => {
    setEstado(!estado);
  };

  const edit = async () => {
//EDITAR TAREA
    try {

      const res = await fetch(`http://localhost:3000/tareas/${id}`);

      const resJSON: ITareas = await res.json();

      editarTarea({ titulo: resJSON.titulo, prioridad: resJSON.prioridad });

      setEditValor((prevData) => ({
        ...prevData,
        titulo: resJSON.titulo,
        prioridad: resJSON.prioridad, // Actualiza el campo correspondiente
      }));
        
    } catch (error) {
      console.error(error);
    }

  };

  const enviarTareaEditada = async () => {
    await PATCH<ITareas>(`http://localhost:3000/tareas/${id}`, valor);
    editarTarea({ titulo: valor.titulo, prioridad });
    onEdit();
  };

  const prioridadClase =
    valor.prioridad.toLowerCase() === "alta"
      ? "bg-red-500" // Si prioridad es "alta", asigna el fondo rojo
      : valor.prioridad.toLowerCase() === "media"
      ? "bg-yellow-500" // Si prioridad es "media", asigna el fondo amarillo
      : "bg-green-500"; // Si prioridad no es ni "alta" ni "media", asigna el fondo verde (se asume que es "baja")

  return (
    <div
      className={`flex  flex-row p-4  text-black ${prioridadClase} justify-between`}
    >
      {estado ? (
        <EditTarea
        titulo={valor.titulo}
        prioridad={valor.prioridad}
        enviarTareaEditada={enviarTareaEditada}
        handleChange={handleChange}

        />
      ) : (
        <h3 className="text-2xl">{valor.titulo}</h3>
      )}

      <div className="text-red-800 text-xl flex w-[25%] justify-between ">
        <button
          value={id}
          className="p-3"
          onClick={() => {
            id && onEdit(), edit();
          }}
        >
          <CiEdit />
        </button>
        <button value={id} className="p-3" onClick={() => id && onDelete(id)}>
          <TiDelete />
        </button>
      </div>
    </div>
  );
};

export default CardTarea;
