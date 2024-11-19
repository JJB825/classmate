import CourseDetails from '../components/CourseDetails';
import StudentSidebar from '../../student/components/StudentSidebar';
import TeacherSidebar from '../../teacher/components/TeacherSidebar';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useEffect, useState } from 'react';

const CourseDetailsPage = () => {
  const { user, getRoleFromUser } = useFirebaseContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRoleFromUser(user?.email ?? 'vddhore@gmail.com').then((role) =>
      setRole(role)
    );
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Sidebar */}
      <div style={{ flex: '1 0 auto', maxWidth: '300px' }}>
        {role === 'student' ? <StudentSidebar /> : <TeacherSidebar />}
      </div>

      <div
        style={{
          flex: '3 1 auto',
          position: 'relative',
        }}
      >
        <CourseDetails />
      </div>
    </div>
  );
};
export default CourseDetailsPage;
