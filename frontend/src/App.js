import {createBrowserRouter,Route,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import {CourseList} from './pages/Courses/CourseList'
import {AddCourse} from "./pages/Courses/AddCourse";
import { Login } from "./pages/login/Login";
import {CreateAccount} from './pages/login/CreateAccount'
import { AuthProvider } from "./auth/Auth";
import { RequireAuth } from "./components/requireAuth";
import { Profile } from "./pages/shared/myprofile";
import { Chats } from './pages/shared/chats';
import { Text } from './pages/shared/Text';
import { Course } from './pages/Courses/Course';
import { CreateAssignment } from './pages/instructors/CreateAssignment';
import { Assignment } from './pages/shared/assignment';
import { Register } from './pages/students/register';
import { Admit } from './pages/instructors/admit';
import { ZoomRoom } from './pages/shared/ZoomRoom';
import { ZoomMeeting } from './pages/shared/ZoomMeeting';
import { Profile as Prof } from './pages/shared/profile';
import { Complement } from './pages/instructors/complement';
import { Awards } from './pages/students/awards';
import { Award } from './pages/students/Award';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/chats/*" element={<RequireAuth><Chats /></RequireAuth>} />
      <Route path="/chats/messages/:chatId" element={<RequireAuth><Text/></RequireAuth>}/>
      <Route index render element={<RequireAuth><CourseList /></RequireAuth>}/>
      <Route path='courses/add' element={<RequireAuth><AddCourse /></RequireAuth>}/>
      <Route path='course/:courseId' element={<RequireAuth><Course/></RequireAuth>}/>
      <Route path='chats/*' element={<RequireAuth><Chats /></RequireAuth>}/>
      <Route path='login' element={<Login/>}/>
      <Route path="signup" element={<CreateAccount/>}/>
      <Route path="/me" element={<RequireAuth><Profile/></RequireAuth>}/>
      <Route path="/complement/:id" element={<RequireAuth><Complement/></RequireAuth>}/>
      <Route path="/profile/:personId" element={<RequireAuth><Prof/></RequireAuth>}/>
      <Route path="/register" element={<RequireAuth><Register/></RequireAuth>}/>
      <Route path='/course/:courseId/assignments/create/' element={<RequireAuth><CreateAssignment/></RequireAuth>}/>
      <Route path='/course/:courseId/assignment/:assignmentId' element={<RequireAuth><Assignment/></RequireAuth>}/>
      <Route path='/course/:courseId/admit' element={<RequireAuth><Admit/></RequireAuth>}/>
      <Route path='/zoom/' element={<RequireAuth><ZoomRoom /></RequireAuth>}/>
      <Route path='/zoom/meeting' element={<RequireAuth><ZoomMeeting /></RequireAuth>}/>
      <Route path='/me/awards' element={<RequireAuth><Awards /></RequireAuth>}/>
      <Route path='/me/awards/:awardId' element={<RequireAuth><Award /></RequireAuth>}/>
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
