import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function ProtectedAccount({children}) {

  let {userToken} = useSelector((state)=> state.userToken)

  if (userToken) {
    return children
  }
  else{
    return <Navigate to={'/'} />
  }
}
