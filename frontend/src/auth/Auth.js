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
    setUser(null)
  }
  
  return (<AuthContext.Provider value={{login, logout}}>
          {children}
          </AuthContext.Provider>
  )
}


export const useAuth = () =>{
    return(
        useContext(AuthContext)
    )
}