import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { url } from "../config"
import { GET_TASKS, FILTER_BY_PRIORITY, FILTER_BY_STATUS, REMOVE_FILTER } from '../context/constansts'
import Modal from '../components/Modal'
import DeleteModal from "../components/DeleteModal"
import Card from '../components/Card'
import { useAuthApi } from "../context/authContext/authProvider"
import { useTaskApi } from "../context/taskContext/taskProvider"
import Dropdown from '../components/Dropdown'
import nodata from "../assets/nodata.png"
const active = "py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full"
const Home = () => {
  const { state: authState } = useAuthApi()
  const { state: taskState, dispatch } = useTaskApi()
  const { tasks, duplicateTasks } = taskState
  const [openModal, setopenModal] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [filterTitle, setFilterTitle] = useState("All")
  useEffect(() => {
    getData()
  }, [authState.user])
  useEffect(() => {
    if (filter === 'all' | filter === 'done' | filter === 'pending') {
      if (filter === "all") {
        setFilterTitle('All')
        dispatch({ type: REMOVE_FILTER })
      }
      if (filter === "done") {
        dispatch({ type: REMOVE_FILTER })
        setFilterTitle('Completed')
        dispatch({ type: FILTER_BY_STATUS, payload: true })
      }
      if (filter === 'pending') {
        dispatch({ type: REMOVE_FILTER })
        setFilterTitle('Pending')
        dispatch({ type: FILTER_BY_STATUS, payload: false })
      }
    } else {
      setFilterTitle(filter + " Priority")
      dispatch({ type: REMOVE_FILTER })
      dispatch({ type: FILTER_BY_PRIORITY, payload: filter })
    }

  }, [filter])

  const getData = async () => {
    try {
      const { _id } = authState.user
      let res = await axios.get(`${url}/tasks/all/${_id}`);
      dispatch({ type: GET_TASKS, payload: res.data.data })
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div id='home'>

      {
        openModal && <Modal setModal={setopenModal} taskToUpdate={taskToUpdate} setTaskToUpdate={setTaskToUpdate} modal={openModal} />
      }
      {
        openDeleteModal && <DeleteModal setModal={setDeleteModal}  taskToDelete={taskToDelete} setTaskToDelete={setTaskToDelete} />
      }
    
   
      <div className="sm:px-6 w-full">
        {/* dropdown */}
          {
          duplicateTasks && duplicateTasks.length > 0 && <Dropdown setFilter={setFilter} />
          }
     
       
     

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          {/* header */}
        
          <div className=" flex items-center justify-between">
          
            <div>
              {
                duplicateTasks && duplicateTasks.length > 0 && <div className=" hidden md:items-center md:flex">
                  <span className=" rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 ">
                    <div className={active}>
                      <p>{filterTitle.toUpperCase() + "  TASKS"}</p>
                    </div>
                  </span>
                </div>
              }
            </div>

            <button type='button' onClick={() => setopenModal(true)} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4  sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded ">
              <p className="text-sm font-medium leading-none text-white">Add Task</p>
            </button>
          </div>
              
          {
            tasks && tasks.length > 0 ? <div className="container mx-auto py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <Card key={task.id} task={task} setTaskToUpdate={setTaskToUpdate} setModal={setopenModal} setDeleteModal={setDeleteModal} setTaskToDelete={setTaskToDelete} />
                ))}
              </div>
            </div> : <div className=' my-5 items-center flex flex-col justify-center'>
            <h3 className='text-2xl font-bold'>No Task Found</h3>
                <img className='h-5/6 w-5/6 md:h-3/6 md:w-3/6' src={nodata} alt="No Data" />
            </div>
      }
       


        </div>
      </div>


    </div>
  )
}

export default Home