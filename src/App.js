
import './App.css';
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import PageNotFound from './pages/PageNotFound';
import { Route, Routes, } from "react-router-dom";
import Navbar from './components/Navbar';
import { useAuthApi } from './context/authContext/authProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { state } = useAuthApi()
    
  
  return (

    <div className='bg-blue'>
      <Navbar />
      <ToastContainer/>
      {
        !state.user? <>
          <Routes>

            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<Login />} />
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </> : <>
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/" element={<Home />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
      }
   
  
  
    </div>

  );
}

export default App;
