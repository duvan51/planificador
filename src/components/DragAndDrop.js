import { useEffect, useState } from 'react'
import React from 'react'
import "./drag_and_drop.css"
import { getTasks, updateTask } from '../services/api'

import AddCircleIcon from '@mui/icons-material/AddCircle';

import CreateNotes from './CreateNotes';



const DragAndDrop = () => {
    
   const [tasks, setTasks] = useState([])
   useEffect(()=> {
      // Llama a la función de servicio para obtener productos
      getTasks()
        .then(data => {
          // Maneja los datos obtenidos
          setTasks(data)
          console.log(data)
        })
        .catch(error => {
          // Maneja los errores
          console.error(error);
        });
  },[])


  /* ventana modal abrir y cerrar */
      const [showModal, setShowModal] = useState(false);

      const handleOpenModal = () => {
         setShowModal(true);
      };

      const handleCloseModal = () => {
         setShowModal(false);
      };

  /*---- end  */


   const getList = (list) => {
      return tasks.filter(item => item.list == list)
   }

   const startDrag = (evt, item) => {
      evt.dataTransfer.setData("item", JSON.stringify(item));
      console.log(item);
   }

   const draggingOver = (evt) => {
      evt.preventDefault();
   }

   const onDrop = (evt, newList) => {
      evt.preventDefault();
      const itemId = evt.dataTransfer.getData("item");
      const draggedItem = JSON.parse(itemId);
      const updatedTasks = tasks.map(task => {
        if (task.id === draggedItem.id) {
          const updatedTaskData = { ...task, list: newList };
          updateTask(task.id, updatedTaskData)
            .then(() => console.log("Tarea actualizada correctamente"))
            .catch(error => console.error("Error al actualizar la tarea: ", error));
          return updatedTaskData;
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  
   return (
      <>
         <h1>
            ARRASTRAR Y SOLTAR
         </h1>
         <div className='columnsItems'>
            <div className='column1' droppable="true" onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, 1)}>
               <div className='columnsItemsHeader'>
                  <div>ideas</div>
                  <div>
                     <button onClick={handleOpenModal}><AddCircleIcon /></button>
                     {showModal && <CreateNotes onClose={handleCloseModal} />}
                  </div>               
               </div>
               <div className='tasks' >
                  {getList(1).map(item => (
                     <div key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                        <div>{item.id}</div>
                        <div>{item.list}</div>
                        <div>{item.descripcion}</div>
                     </div>
                  ))}
               </div>
            </div>
            <div className='column2' droppable="true" onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, 2)} >
               <div>Proyectos por hacer</div>
               <div className='tasks' >
                  {getList(2).map(item => (
                     <div key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                        <div>{item.id}</div>
                        <div>{item.descripcion}</div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
        
        
         </>
      
   )
}

export default DragAndDrop