import { useState, createContext, useContext} from "react";

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
  const [user,setUser] = useState('')
  const login = ({token, newUser}) => {
    //setToken(token)
    localStorage.setItem('token',token)
    localStorage.setItem('user',newUser)
    setUser(newUser)
  }

  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('_id')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
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