import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../../context/FirebaseContext';

function SubjectCard({ courseId, courseName, courseCode, taughtBy }) {
  const { user, getRoleFromUser } = useFirebaseContext();
  const navigate = useNavigate();

  const redirect = async (courseId) => {
    const role = await getRoleFromUser(user.email);
    if (role === 'teacher') {
      navigate(`/teacher/courses/${courseId}`);
    } else {
      navigate(`/student/courses/${courseId}`);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{courseName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{courseCode}</Card.Text>
        <Card.Text>{taughtBy}</Card.Text>
        <Button variant='primary' onClick={() => redirect(courseId)}>
          View Course
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SubjectCard;
