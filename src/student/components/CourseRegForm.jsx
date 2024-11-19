import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { showErrorToast, showSuccessToast } from '../../utils/notifications';

const CourseRegForm = (props) => {
  const [courses, setCourses] = useState([]);
  const {
    getAllCourses,
    generateRequests,
    addStudentToCourse,
    getCourseIdFromName,
    updateStudentUsers,
  } = useFirebaseContext();

  useEffect(() => {
    getAllCourses().then((querySnapshot) => {
      setCourses(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if ([...formData.values()].includes('')) {
      showErrorToast('Please fill all the values!');
      form.reset();
      return;
    }
    const formObject = Object.fromEntries(formData);
    const { name, email, course, message } = formObject;
    await generateRequests('register', email, course, message);
    const courseId = await getCourseIdFromName(course);
    await updateStudentUsers(email, course);
    const { res, err } = await addStudentToCourse(courseId, name, email);
    if (res) {
      showSuccessToast(res);
    } else if (err) {
      showErrorToast(err);
    }
    form.reset();
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id='contained-modal-title-vcenter'
          style={{ textAlign: 'center', width: '100%' }}
        >
          Course Registration
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formGroupName'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' name='name' placeholder='Enter name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' name='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupCourse'>
            <Form.Label>Select Course</Form.Label>
            <Form.Select aria-label='Courses' name='course'>
              {courses.map((course) => {
                return (
                  <option key={course.courseCode} value={course.courseName}>
                    {course.courseName}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupMessage'>
            <Form.Label>Message for teacher</Form.Label>
            <Form.Control
              type='text'
              name='message'
              placeholder='Enter message to be sent to teacher'
            />
          </Form.Group>
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CourseRegForm;
