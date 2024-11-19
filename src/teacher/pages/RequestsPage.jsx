import Requests from '../components/Requests';
import TeacherSidebar from '../components/TeacherSidebar';

const RequestsPage = () => {
  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Sidebar */}
      <div style={{ flex: '1 0 auto', maxWidth: '300px' }}>
        <TeacherSidebar />
      </div>

      {/* Form Container */}
      <div
        style={{
          flex: '3 1 auto',
          position: 'relative',
        }}
      >
        <Requests />
      </div>
    </div>
  );
};
export default RequestsPage;
