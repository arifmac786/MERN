import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptainSignup() {
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [ userData,setUserData] = useState([])

  const handleSubmit = (e)=>{
    e.preventDefault()
    setUserData([...userData,{
      fullname:{
        firstname,lastname
      },
      email,password
    }])
    setEmail('')
    setFirstname('')
    setLastname('')
    setPassword('')
  }
  return (
    <div>
       <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img src="uber-driver.svg" className="w-16 mb-5 " alt="uber-logo" />
          <form onSubmit={handleSubmit}>
            <h3 className="text-base mb-2">What's our Captain's name</h3>
            <div className="flex gap-3 mb-5 ">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-2 py-2   text-base placeholder:text-sm"
                type="text"
                required
                value={firstname}
                onChange={(e)=>setFirstname(e.target.value)}
                placeholder="firstname"
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-2 py-2     text-base placeholder:text-sm"
                type="text"
                placeholder="lastname"
                value={lastname}
                onChange={(e)=>setLastname(e.target.value)}
              />
            </div>

            <h3 className="text-base mb-2">What's our email</h3>

            <input
              className="bg-[#eeeeee] rounded px-2 py-2 mb-5 w-full text-base placeholder:text-sm"
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="email@example.com"
            />
            <h3 className="text-base mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] rounded px-2 py-2 mb-5 w-full text-base placeholder:text-sm"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              name=""
              id=""
            />
            <button className="bg-[#111] text-[#fff] font-semibold rounded px-2 py-2 mb-7 w-full text-lg placeholder:text-base">
              Sign Up
            </button>
          </form>
          <p className="text-center">
            Already have a account ?
            <Link to="/captain-login" className="text-blue-600">
              {" "}
              Login here
            </Link>
          </p>
        </div>
        <div>
         <p className="text-[8px] leading-tight">
           This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy</span> and <span className='underline'>Terms of Service apply.</span>
         </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup
