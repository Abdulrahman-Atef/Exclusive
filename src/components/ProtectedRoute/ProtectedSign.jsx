import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function ProtectedSign({children}) {

  let {userToken} = useSelector((state)=> state.userToken)

  if (userToken) {
    return <Navigate to={'/'} />
  }
  else{
    return children
  }
}
