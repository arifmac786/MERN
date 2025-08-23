import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptainLogin() {

  const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [captainData,setCaptainData] = useState([])
  
    const handleSubmit = (e)=>{
      e.preventDefault()
      setCaptainData([
      ...captainData,
       { email:email,
        password:password
      }])
      console.log(userData);
      
      setEmail('')
      setPassword('')
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
         <img src="uber-driver.svg" className='w-16 mb-2 ' alt="uber-logo" />
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl mb-2">What's your email</h3>
        <input
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)}
          
        }

          className="bg-[#eeeeee] rounded px-2 py-2 mb-7 w-full text-lg placeholder:text-base"
          type="email"
          required
          placeholder="email@example.com"
        />
        <h3 className="text-xl mb-2">Enter Password</h3>
        <input
          className="bg-[#eeeeee] rounded px-2 py-2 mb-7 w-full text-lg placeholder:text-base"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="password"
          required
          name=""
          id=""
        />
        <button className='bg-[#111] text-[#fff] font-semibold rounded px-2 py-2 mb-7 w-full text-lg placeholder:text-base' 
>Login</button>
      </form>
      <p className="text-center"> Join a fleet ? 
      <Link to='/captain-signup' className="text-blue-600"> Register as a captain</Link>
      </p>
      </div>
      <div>
        <Link to = '/login' className='flex items-center justify-center bg-[#d5622d] text-[#fff] font-semibold rounded px-2 py-2 mb-7 w-full text-lg placeholder:text-base'  > Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
