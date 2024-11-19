import StudentSidebar from '../../student/components/StudentSidebar';
import TeacherSidebar from '../../teacher/components/TeacherSidebar';
import CardGrid from '../components/CardGrid';
import Button from 'react-bootstrap/Button';
import CourseRegForm from '../../student/components/CourseRegForm';
import AddCourseForm from '../../teacher/components/AddCourseForm';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const { user, getRoleFromUser } = useFirebaseContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRoleFromUser(user?.email ?? 'test@gmail.com').then((role) =>
      setRole(role)
    );
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Sidebar */}
      <div style={{ flex: '1 0 auto', maxWidth: '300px' }}>
        {role === 'student' ? <StudentSidebar /> : <TeacherSidebar />}
      </div>

      {/* Card Grid */}
      <div
        style={{
          flex: '3 1 auto',
          position: 'relative',
          paddingBottom: '40px',
        }}
      >
        <CardGrid />

        {/* Register Button */}
        <Button
          variant='success'
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
          onClick={() => setModalShow(true)}
        >
          {role === 'student' ? 'Register for New Course' : 'Add New Course'}
        </Button>
      </div>
      {role === 'student' ? (
        <CourseRegForm show={modalShow} onHide={() => setModalShow(false)} />
      ) : (
        <AddCourseForm show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </div>
  );
};

export default Dashboard;
