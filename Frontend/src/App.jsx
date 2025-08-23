import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { UserDateContext } from './context/userContext'

function App() {
  const [count, setCount] = useState(0)
   
 const ans = useContext(UserDateContext)
 console.log(ans);

 
  return (
    <>
     <Routes>
       <Route path='/' element = {<Home/>}/>
       <Route path='/login' element = {<UserLogin/>}/>
       <Route path='/signup' element = {<UserSignup/>}/>
       <Route path='/captain-login' element = {<CaptainLogin/>}/>
       <Route path='/captain-signup' element = {<CaptainSignup/>}/>
     </Routes>
          
    </>
  )
}

export default App
