import React from 'react'
import {useLocation, Link,useNavigate} from 'react-router-dom'
import { useAuthApi } from '../context/authContext/authProvider';
const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {state,dispatch} = useAuthApi()
  let active = "mr-4 px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
  let notActive = "mr-5 font-medium hover:text-gray-900"
  const Logout = () =>{
    dispatch({ type:"LOGOUT"})
    navigate("/")
      
  }
  return (
    <header className="w-full mt-5 text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
      <div className="container flex flex-row items-start justify-between p-6 mx-auto ">
        <h3 className="flex items-center text-xl mb-4 font-bold text-gray-900 title-font md:mb-0">
            Task Manager 
        </h3>
        {
          !state.user ? <>
            <div className="items-center h-full">
              <Link to="/" className={location.pathname === "/" ? active : notActive}>Login</Link>
              <Link to="/register"
                className={location.pathname === "/register" ? active : notActive}>
                Sign Up
              </Link>
            </div>
          </>:<>
              <div className="items-center h-full">
               <button onClick={()=> Logout()} className={active}>Logout</button>
              </div>
          </>
        }
    
      </div>
    </header>
  )
}

export default Navbar