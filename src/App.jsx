import { Route, Routes } from 'react-router-dom';

// pages
import Home from './home/pages/Home';
import Register from './home/pages/Register';
import Login from './home/pages/Login';
import Dashboard from './home/pages/Dashboard';
import EditProfile from './home/pages/EditProfile';
import CourseDetailsPage from './home/pages/CourseDetailsPage';
import RequestsPage from './teacher/pages/RequestsPage';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/coreui-pro/dist/css/coreui.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/student/dashboard/' element={<Dashboard />} />
        <Route path='/student/edit-profile/' element={<EditProfile />} />
        <Route
          path='/student/courses/:courseId'
          element={<CourseDetailsPage />}
        />
        <Route
          path='/student/courses/:courseId/assignments/:assignmentId'
          element={<CourseDetailsPage />}
        />
        <Route path='/teacher/dashboard/' element={<Dashboard />} />
        <Route path='/teacher/edit-profile/' element={<EditProfile />} />
        <Route
          path='/teacher/courses/:courseId'
          element={<CourseDetailsPage />}
        />
        <Route
          path='/teacher/courses/:courseId/assignments/:assignmentId'
          element={<CourseDetailsPage />}
        />
        <Route path='/teacher/requests/' element={<RequestsPage />} />
      </Routes>
    </>
  );
}

export default App;
