import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedResetPassword({children}) {
  if (localStorage.getItem('AuthorizedToResetPasswordPage')){
    return children
  }
  else{
    return <Navigate to={'/'} />
  }
}
