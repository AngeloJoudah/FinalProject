import {Header} from "./components/Header/Header";
import {createBrowserRouter,Route,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import { Footer } from "./components/Footer/Footer";
import {Home} from './pages/Home/Home'
import {CourseList} from './pages/Courses/CourseList'
import {Container} from 'react-bootstrap'
import {AddCourse} from "./pages/Courses/AddCourse";
import { Login } from "./pages/Login/Login";
import {CreateAccount} from './pages/Login/CreateAccount'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home/>}/>
      <Route path='courses' element={<CourseList />}/>
      <Route path='courses/add' element={<AddCourse />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/signup" element={<CreateAccount/>}/>
    </Route>
  )
)
function App() {
  return (
    <Container fluid>
    <div className="App">
      <Header/>
      <RouterProvider router={router}/>
      <Footer />
    </div>
    </Container>
  );
}

export default App;
