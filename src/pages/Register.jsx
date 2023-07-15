import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {url} from "../config"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [userCredential, setUserCredential] = useState({
        email: '',
        password: '',
        name:''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => setUserCredential(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    const handleSubmit = async  (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
         await axios.post(`${url}/auth/register`, userCredential,config);
         setLoading(false)
            setUserCredential({
                email: '',
                password: '',
                name: ''
            })
            navigate('/')
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
     
    }
  return (
    //   <div className="antialiased bg-slate-200">
          <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
              <h1 className="text-4xl font-medium">Register</h1>
              <p className="text-slate-500">Hi, Welcome  👋</p>
              <form onSubmit={(e) => handleSubmit(e)} className="my-6">
                  <div className="flex flex-col space-y-5">
                      <label for="name">
                          <p className="font-medium text-slate-700 pb-2">Name</p>
                          <input id="name" name="name" type="text"
                            value={userCredential.name}
                             onChange={(e) => handleChange(e)}
                           className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your name" required minLength={3} />
                      </label>
                      <label for="email">
                          <p className="font-medium text-slate-700 pb-2">Email address</p>
                          <input id="email" name="email" type="email"
                              value={userCredential.email}
                              onChange={(e) => handleChange(e)}
                           className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" required />
                      </label>
                      <label for="password">
                          <p className="font-medium text-slate-700 pb-2">Password</p>
                          <input id="password" name="password" type="password" 
                              value={userCredential.password}
                              onChange={(e) => handleChange(e)}
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" required minLength={6}/>
                      </label>
                      <button type='submit'
                      disabled={loading}
                      className="w-full py-3 font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg border-purple-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                   
                         
                   
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span>Register</span>
                      </button>
                      
                      {/* this bootom navigate link */}
                      <p className="text-center">already registered ? <Link to="/" className="text-purple-600 font-medium inline-flex space-x-1 items-center"><span>Login now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg></span></Link></p>
                  </div>
              </form>
          </div>

    //   </div>
  )
}

export default Register