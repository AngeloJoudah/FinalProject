import {createBrowserRouter,Route,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import {Home} from './pages/Home/Home'
import {CourseList} from './pages/Courses/CourseList'
import {AddCourse} from "./pages/Courses/AddCourse";
import { Login } from "./pages/login/Login";
import {CreateAccount} from './pages/login/CreateAccount'
import { AuthProvider } from "./auth/Auth";
import { RequireAuth } from "./components/requireAuth";
import { Profile } from "./pages/shared/profile";
import { Text } from "./pages/shared/Text"
import { Chats } from './pages/shared/chats';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index render element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path='courses' element={<RequireAuth><CourseList /></RequireAuth>}/>
      <Route path='courses/add' element={<RequireAuth><AddCourse /></RequireAuth>}/>
      <Route path='chats' element={<RequireAuth><Chats /></RequireAuth>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/signup" element={<CreateAccount/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/messages" element={<Text/>}/>
    </Route>
  )
)
function App() {
  return (
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
