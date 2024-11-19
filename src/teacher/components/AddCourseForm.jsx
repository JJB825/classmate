import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast, Bounce } from 'react-toastify';
import { useFirebaseContext } from '../../context/FirebaseContext';

const AddCourseForm = (props) => {
  const { user, addNewCourse } = useFirebaseContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if ([...formData.values()].includes('')) {
      toast.error('Please fill all the values!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      form.reset();
      return;
    }
    const newCourse = Object.fromEntries(formData);
    const { res, err } = await addNewCourse(newCourse, user.email);
    if (res) {
      toast.success(res, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } else {
      toast.error(err, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
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
          Add New Course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formGroupTeacherName'>
            <Form.Label>Teacher Name</Form.Label>
            <Form.Control
              type='text'
              name='teacherName'
              placeholder='Enter your name'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupCourseName'>
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type='text'
              name='courseName'
              placeholder='Enter course name'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupCourseCode'>
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type='text'
              name='courseCode'
              placeholder='Enter course code'
            />
          </Form.Group>
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Button variant='primary' type='submit'>
              Add new course
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
export default AddCourseForm;
