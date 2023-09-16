import React from 'react'
import { useAuth } from '../auth/Auth'
import { Navigate } from 'react-router'

export const RequireAuth = () => {
    const auth = useAuth()
    if(!auth.user){
        return <Navigate to={'/login'}/>
    }
    
}
