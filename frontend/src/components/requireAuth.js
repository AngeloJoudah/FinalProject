import { useLocation } from 'react-router';
//import * as jsonwebtoken from 'jsonwebtoken'
import { Navigate } from 'react-router';
export const RequireAuth = ({children}) => {
  const location = useLocation();
  const user = localStorage.getItem('user')
  if(!user){
    return <Navigate to={'/login'} state={{ path: location.pathname }} />;
  }
  return children

};