import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {LOAD_USER_SUCCESS} from "../context/constansts"
import {url
} from "../config"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthApi } from '../context/authContext/authProvider'
const Login = () => {
    const navigate = useNavigate()
    const {  dispatch } = useAuthApi()
    const [loginCredential, setLoginCredential] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => setLoginCredential(prevState =>({...prevState,[e.target.name]:e.target.value}))
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
          let config = {
              headers: {
                  "Content-Type": "application/json",
              },
          }
          let res = await axios.post(`${url}/auth/`, loginCredential, config);
          config = {
              headers: {
                  "authorization": `Bearer ${res.data.token}`
              },
          }
         let res1 = await axios.get(`${url}/auth/`,config);
          localStorage.setItem("user", JSON.stringify(res1.data))
          dispatch({ type: LOAD_USER_SUCCESS, payload: res1.data });
          setLoading(false)
          setLoginCredential({
              email: '',
              password: ''
          })
          navigate("/home")
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
     
    }
  return (
  
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300" >

      
              <h1 className="text-4xl font-medium">Login</h1>
              <p className="text-slate-500">Hi, Welcome back 👋</p>
              <form onSubmit={(e) => handleSubmit(e) } className="my-10">
                  <div className="flex flex-col space-y-5">
                      <label for="email">
                          <p className="font-medium text-slate-700 pb-2">Email address</p>
                          <input 
                          value={loginCredential.email}
                          onChange={(e) => handleChange(e)}
                          id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" required/>
                      </label>
                      <label for="password">
                          <p className="font-medium text-slate-700 pb-2">Password</p>
                          <input id="password" name="password" type="password" 
                              value={loginCredential.password}
                              onChange={(e) => handleChange(e)}
                              minLength={6}
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" required />
                      </label>
                      <button 
                      type='submit'
                      disabled={loading}
                      className="w-full py-3 font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg border-purple-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span>Login</span>
                      </button>
                      <p className="text-center">Not registered yet? <Link to="/register" className="text-purple-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg></span></Link></p>
                  </div>
              </form>
          </div>

       
  )
}

export default Login