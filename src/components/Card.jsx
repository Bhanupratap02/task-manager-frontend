import React from 'react'
import axios from 'axios';
import { useTaskApi } from '../context/taskContext/taskProvider';
import { url } from '../config';
import {  UPDATE_TASK } from '../context/constansts';
const Card = ({ task, setModal, setDeleteModal, setTaskToUpdate, setTaskToDelete }) => {
  const { dispatch } = useTaskApi()
  const handleEdit = () => {
    setDeleteModal(false)
    setTaskToUpdate(task)
     const element = document.getElementById("home");
     if(element){
      element.scrollIntoView({behavior:"smooth"});
     }
    setModal(true)
  }
  const handleDelete = () => {
    setTaskToDelete(task)
    setTaskToUpdate(null)
    setModal(false)
    const element = document.getElementById("home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setDeleteModal(true)
  }
   const handleStatus = async () =>{

     let config = {
       headers: {
         "Content-Type": "application/json",
       },
     }
     try {
       let res = await axios.put(`${url}/tasks/${task?._id}/edit/${task?.user}`, {status:!task?.status}, config);
       dispatch({ type: UPDATE_TASK, payload: res?.data?.data })
     } catch (error) {
      console.log(error);
     }
   }
  const complete = "inline-block rounded-full text-white  px-2 py-1 text-sm font-bold ml-2 mr-3 cursor-pointer my-2 bg-green-500"
  const pending = "inline-block rounded-full text-white  px-2 py-1 text-sm font-bold ml-2 mr-3 cursor-pointer my-2 bg-purple-500"
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">{task.subject}</h2>
        <p className="text-gray-600 text-base font-medium my-2">Due Date: {task.dueDate}</p>
        <p className={`text-base font-medium my-2`}>Priority: {task.priority}</p>
        <span className='text-sm font-medium'>
          Status:
          <button onClick={(e) => handleStatus()} className={task.status?complete:pending}> {task.status ? 'Completed' : 'Pending'}</button>
        </span>

        <div className="flex justify-end">
          <button onClick={handleEdit} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded-lg">Edit</button>
          <button onClick={() => handleDelete()} className="bg-red-500 text-white py-2 px-4 rounded-lg">Delete</button>
        </div>
      </div>
    </>
  )
}

export default Card