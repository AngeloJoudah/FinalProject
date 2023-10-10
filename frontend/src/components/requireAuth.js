import { useLocation } from 'react-router';
//import * as jsonwebtoken from 'jsonwebtoken'
import { Navigate } from 'react-router';
export const RequireAuth = ({children}) => {
  const location = useLocation();
  const token = localStorage.getItem('token')
  const decodedToken = token//jsonwebtoken.verify(token,'Hd6QCYdIAX9UeLBzOPvPXA/GuwCqus6AVfsSv6S8ba9Iop+fIoqRd2M5GYjC6RGAdOGFR1gBH4GLS3dU24HokSoX3VvvHh9Plr7hY/WMF/Eu2fCmdke4VMGSzJ4m8fHlC2/q5ZPScPfpK+W8ijKWbIVP8I4UBk/Xq9JcuSEOoupebx5ZDg0MDIaPIu/3ck92J+Mf+JsMJzK+B7z31qXjq7LuzyuF18BgNeihrzu+cA2NZ7i9u1IkRBfT+QdMmgPlkz3tmLAB2ZVKCFnw9Fdg69go3riKe4DWz7zmE1yz/CucfHTUO3pXyjo0IyZqDmnDcqlrfitSe32MedP58PI4mFaRE+G982/9w/FJ92I0G+4=\r\n')
  if(!decodedToken){
    return <Navigate to={'/login'} state={{ path: location.pathname }} />;
  }
  return children

};