import React from 'react'
import axios from 'axios';
import { url } from '../config';
import { DELETE_TASK } from '../context/constansts';
import { useTaskApi } from '../context/taskContext/taskProvider';
import { toast } from 'react-toastify';
const DeleteModal = ({ setModal, modal, taskToDelete, setTaskToDelete }) => {
    const {dispatch} = useTaskApi()
  const handleDelete = async () => {
     try {
         await axios.delete(`${url}/tasks/${taskToDelete._id}/${taskToDelete.user}`);
         dispatch({type:DELETE_TASK,payload:taskToDelete._id})
         toast.success("Task Deleted")
         setTaskToDelete(null)
         setModal(false)
     } catch (error) {
        console.log(error);
     }
  }
  return (

      <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-10 right-0 bottom-0 left-0 lg:top-0">
          <div class="bg-white px-16 py-14 rounded-md text-center">
              <h1 class="text-xl mb-4 font-bold text-slate-500">Do You Want To  Delete The Task</h1>
              <button onClick={() =>setModal(false)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancel</button>
              <button type='submit' onClick={handleDelete} class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
          </div>
      </div>
  )
}

export default DeleteModal