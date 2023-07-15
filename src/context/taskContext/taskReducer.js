import { ADD_TASK,UPDATE_TASK,DELETE_TASK,GET_TASKS,FILTER_BY_PRIORITY,FILTER_BY_STATUS,REMOVE_FILTER } from "../constansts"

const taskReducer = (state, action) => {
    switch (action.type) {
     case GET_TASKS:
        return{
            ...state,
          tasks:action.payload,
          duplicateTasks:action.payload

        }
     case ADD_TASK :
        return {
            ...state,
            tasks:[...state.tasks,action.payload],
            duplicateTasks: [...state.tasks, action.payload]
        }
        case UPDATE_TASK:
               return {
                ...state,
               tasks: state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                ),
                duplicateTasks:state.tasks
            };
        case DELETE_TASK:
            return{
                ...state,
                tasks:state.tasks.filter(task => task._id !== action.payload),
                duplicateTasks: state.duplicateTasks.filter(task => task._id !== action.payload),
            } 
        case FILTER_BY_PRIORITY:
            return {
                ...state,
                tasks:state.tasks.filter(task => task.priority === action.payload )
            }
        case FILTER_BY_STATUS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.status === action.payload)
            }
        case REMOVE_FILTER:
            return {
                ...state,
                tasks: state.duplicateTasks
            }
        default:
            return state;
    }

}

export default taskReducer;