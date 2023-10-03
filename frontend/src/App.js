import {Header} from "./components/Header/Header";
import {createBrowserRouter,Route,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import { Footer } from "./components/Footer/Footer";
import {Home} from './pages/Home/Home'
import {CourseList} from './pages/Courses/CourseList'
import {Container} from 'react-bootstrap'
import {AddCourse} from "./pages/Courses/AddCourse";
import { Login } from "./pages/login/Login";
import {CreateAccount} from './pages/login/CreateAccount'
import axios from "axios";
import { AuthProvider } from "./auth/Auth";
import { RequireAuth } from "./components/requireAuth";
import { Profile } from "./pages/shared/profile";
import { Messages } from "./pages/shared/messages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index render element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path='courses' element={<RequireAuth><CourseList /></RequireAuth>}/>
      <Route path='courses/add' element={<RequireAuth><AddCourse /></RequireAuth>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/signup" element={<CreateAccount/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/messages" element={<Messages/>}/>
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
