import React, { FC } from 'react'
import { ITareas } from '../types/ITareas'

const CardTarea:FC<ITareas>=({titulo,prioridad})=> {
  return (
  <div>
    <h1>{titulo}</h1>
    <h1>{prioridad}</h1>
  </div>
  )
}

export default CardTarea