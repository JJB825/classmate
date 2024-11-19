import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { RiDashboard3Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { SiCoursera } from 'react-icons/si';
import { FaDiscourse } from 'react-icons/fa6';
import { CButton } from '@coreui/react';
import { IoIosNotifications } from 'react-icons/io';
import { useFirebaseContext } from '../../context/FirebaseContext';

const TeacherSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const { user, logout, getCoursesTaughtByMe } = useFirebaseContext();
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesTaughtByMe(user?.email ?? 'vddhore@gmail.com').then((courses) =>
      setCourses(courses)
    );
  }, [courses]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(to bottom, #E6E6FA, #D6D6FF, #ADD8E6, #90EE90, #FFFFE0, #FFDAB9, #FFC0CB)',
        height: 'calc(100vh + 25px)',
        width: '250px',
        borderRadius: '25px',
        margin: '10px',
        color: '#000',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Profile Section */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src='https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419477.jpg?ga=GA1.1.952938034.1731192579&semt=ais_hybrid'
          alt='Profile'
          className='rounded-circle'
          style={{
            width: '160px',
            height: '200px',
            marginBottom: '10px',
          }}
        />
        <h3>Welcome Back, {user?.displayName ?? 'user'}</h3>
      </div>

      {/* Navigation Links */}
      <div style={{ width: '100%', flex: 1 }}>
        {/* Dashboard */}
        <Link
          to='/teacher/dashboard/'
          style={{
            color: '#000',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '10px',
          }}
        >
          <RiDashboard3Line size={20} />
          Dashboard
        </Link>

        {/* Edit Profile */}
        <Link
          to='/teacher/edit-profile/'
          style={{
            color: '#000',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '10px',
          }}
        >
          <FiEdit size={20} />
          Edit Profile
        </Link>

        {/* Link to Requests */}
        <Link
          to='/teacher/requests/'
          style={{
            color: '#000',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '10px',
          }}
        >
          <IoIosNotifications size={20} />
          Requests{' '}
        </Link>

        <div
          style={{
            position: 'relative',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <div
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              margin: '10px 0',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <SiCoursera size={20} />
            Courses
          </div>
          <div
            style={{
              maxHeight: isDropdownOpen ? '150px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.5s ease-in-out',
              background: 'transparent',
            }}
          >
            {courses.map((course) => {
              const link = `/teacher/courses/${course.id}`;
              return (
                <Link
                  to={link}
                  key={course.id}
                  style={{
                    color: '#000',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px',
                    gap: '10px',
                  }}
                >
                  <FaDiscourse size={20} />
                  {course.data().courseName}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Logout */}
      <CButton
        color='primary'
        variant='outline'
        shape='rounded-pill'
        onClick={handleLogout}
      >
        <IoIosLogOut size={20} />
        Logout
      </CButton>
    </div>
  );
};

export default TeacherSidebar;
