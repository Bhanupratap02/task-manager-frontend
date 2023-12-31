import React,{useState,useEffect} from 'react'
import { useAuthApi } from '../context/authContext/authProvider';
import { useTaskApi } from '../context/taskContext/taskProvider';
import { url } from '../config';
import { ADD_TASK,UPDATE_TASK } from '../context/constansts';
import axios from 'axios';
import { toast } from 'react-toastify';
const Modal = ({ setModal, taskToUpdate, setTaskToUpdate,modal }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const { state: authState } = useAuthApi()
  const { dispatch } = useTaskApi()
  const [loading, setLoading] = useState(false)
  const [data,setData]=useState({
    subject:'',
    dueDate:'',
    priority:'normal',
    status:false
  })
  useEffect(() => {
   if(taskToUpdate){
      setData(taskToUpdate)
   }
  }, [modal])
  
  const handleChange = (e) =>{
     setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    
    }
    const handleClose = () => {
      setTaskToUpdate(null)
      setData({
        subject: '',
        dueDate: '',
        priority: 'normal'
      })
      setModal(false)
    }

    const addTask =  (userid,config) =>{
      
    axios.post(`${url}/tasks/add/${userid}`, data, config).then(res=>{
      dispatch({ type: ADD_TASK, payload: data })
      setData({
        subject: '',
        dueDate: '',
        priority: 'normal'
      })
      setModal(false)
     setLoading(false)
      toast.success("Task Added")


    })
     
    }
    const updateTask = async (userid,taskid,config) =>{
     
       axios.put(`${url}/tasks/${taskid}/edit/${userid}`, data, config).then(res=>{
         dispatch({ type: UPDATE_TASK, payload: data })
         setData({
           subject: '',
           dueDate: '',
           priority: 'normal'
         })
         setLoading(false)
         setModal(false)
         toast.success("Task Updated")
       })
     
   
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      setLoading(true)
      try {
        const { _id } = authState.user
           if(!taskToUpdate){
             addTask(_id,config)
           }else{
            updateTask(_id,taskToUpdate._id,config)
             setTaskToUpdate(null)
           }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }

  return (
   
      <div className="py-12 bg-slate-800 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-15 lg:top-0 right-0 bottom-0 left-0" id="modal">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-100">
         
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Add Task</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

         
            <div className='mb-4'>
              <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Task Name:</label>
              <input id="name" name='subject' value={data.subject} onChange={(e) => handleChange(e)} className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" placeholder="Enter your task" required minLength={4} />
            </div>
            
        
            <div className='mb-4'>
              <label className="block text-grey-darker text-sm font-bold mb-2">Due Date:</label>
              <input type="date" id="date" name="dueDate" min={currentDate} value={data.dueDate} onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                required
              />
            </div>
            <div className='mb-2'>
              <label className="block text-grey-darker text-sm font-bold mb-2">Choose Prority:</label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  name='priority'
                  value="low"
                  checked={data.priority === 'low'}
                  onChange={(e)=>handleChange(e)}
                />
                <span className="ml-2">Low</span>
              </label>

              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  value="normal"
                  name='priority'
                  checked={data.priority === 'normal'}
                  onChange={(e) => handleChange(e)}
                />
                <span className="ml-2">Normal</span>
              </label>

              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  name='priority'
                  value="high"
                  checked={data.priority === 'high'}
                  onChange={(e) => handleChange(e)}
                />
                <span className="ml-2">High</span>
              </label>
            </div>
           <div className='mb-4'>
              <input
                  name='status'
                value={data.status}
                checked={data.status === true}
                onChange={(e) =>
                  setData({...data,status:e.target.checked})
                  }
               id="remember" type="checkbox" class="mr-1 checked:bg-purple-700" /> <label for="remember" class="mr-auto text-xs font-semibold">Mark task as completed</label>
           </div>
         

         
            <div className="flex items-center justify-start w-full">
              <button type='submit'
              disabled={loading}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>

              <button
                onClick={() => handleClose()}
               className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="modalHandler()">Cancel</button>
              
            </div>
            </form>
            <button type='button'
            onClick={()=>handleClose()}
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onclick="modalHandler()" aria-label="close modal" role="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
     
  
  )
}

export default Modal

