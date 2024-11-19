import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SubjectCard from './Card';
import { useFirebaseContext } from '../../context/FirebaseContext';

function CardGrid() {
  const { user, getCoursesTaughtByMe, getEnrolledCourses, getRoleFromUser } =
    useFirebaseContext();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRoleFromUser(user?.email ?? 'jjbandodkar_b22@ce.vjti.ac.in').then(
      (role) => {
        setRole(role);
      }
    );
  }, []);

  useEffect(() => {
    if (role === 'student') {
      getEnrolledCourses(user?.email ?? 'jjbandodkar_b22@ce.vjti.ac.in').then(
        (courses) => {
          setEnrolledCourses(courses);
        }
      );
    } else {
      getCoursesTaughtByMe(user?.email ?? 'vddhore@gmail.com').then((courses) =>
        setCourses(courses)
      );
    }
  }, [courses, enrolledCourses]);

  return (
    <Container>
      <Row>
        {role === 'teacher'
          ? courses.map((course) => {
              return (
                <Col key={course.id} xs={12} sm={6} md={4} className='mb-4'>
                  <SubjectCard courseId={course.id} {...course.data()} />
                </Col>
              );
            })
          : enrolledCourses.map((course) => {
              return (
                <Col key={course.id} xs={12} sm={6} md={4} className='mb-4'>
                  <SubjectCard courseId={course.id} {...course.data()} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
}

export default CardGrid;
