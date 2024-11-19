import EditProfileForm from '../components/EditProfileForm';
import StudentSidebar from '../../student/components/StudentSidebar';
import TeacherSidebar from '../../teacher/components/TeacherSidebar';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useEffect, useState } from 'react';

const EditProfile = () => {
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

      {/* Form Container */}
      <div
        style={{
          flex: '3 1 auto',
          position: 'relative',
        }}
      >
        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
