import React, { createContext, useState } from 'react'

export const UserDateContext = createContext()

function UserContext({children}) {

  const [user,setUser]=useState({
    email:"",
    fulllname:{
      firstname:"",
      lastname:""
    }
  })


  return (
    <div>
      <UserDateContext.Provider value = {[user,setUser]}>

      {children}
      </UserDateContext.Provider>
    </div>
  )
}

export default UserContext
