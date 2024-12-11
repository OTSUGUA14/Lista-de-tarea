import React, { ChangeEvent, useRef, useState } from "react";
import { ITareas } from "../types/ITareas";
import { POST } from "../services/peticiones";
import FormTarea from "./FormTarea";

interface AddTareaProps {
  onAddTarea: (nuevaTarea: ITareas) => void;
}

const AddTarea: React.FC<AddTareaProps> = ({ onAddTarea }) => {

  const containerAddTarea = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);


  return (
    <div className="flex flex-col ">
      <button onClick={() => setOpen(!open)}>agregar una nueva tarea</button>
      <div
        id="addTarea"
        className="flex flex-col"
        ref={containerAddTarea}
        style={{ display: "" }}
      >
        {open && (
          <FormTarea
          onAddTarea={onAddTarea}
          setOpen={setOpen}
          />
        )}

        
      </div>
    </div>
  );
};

export default AddTarea;
