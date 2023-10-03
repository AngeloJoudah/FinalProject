import { redirect } from "react-router";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import * as yup from 'yup';

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null)
  
  const login = (user) => {
    setUser(user)
  }

  const logout = () =>{
    setUser(null)
  }
  
  return (<AuthContext.Provider value={{user, login, logout}}>
          {children}
          </AuthContext.Provider>
  )
}


export const useAuth = () =>{
    return(
        useContext(AuthContext)
    )
}