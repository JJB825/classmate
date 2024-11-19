import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { signUpWithEmailAndPassword, addNewUser } = useFirebaseContext();
  const navigate = useNavigate();

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
    const newUser = Object.fromEntries(formData);
    const { name, email, password, role } = newUser;
    const { res, err } = await signUpWithEmailAndPassword(
      name,
      email,
      password
    );

    if (res) {
      toast.success('New User created successfully!', {
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
      await addNewUser(email, role);
      form.reset();
      navigate('/login');
    } else {
      toast.error(
        err?.message ?? 'Some Error occured while creating new user',
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        }
      );
      form.reset();
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '80%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Row>
          <Col xs={12} md={6} className='p-4'>
            <h2 className='text-center mb-4'>Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formName' className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                />
              </Form.Group>

              <Form.Group controlId='formEmail' className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  name='email'
                />
              </Form.Group>

              <Form.Group controlId='formPassword' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                />
              </Form.Group>

              <Form.Group controlId='formRole' className='mb-3'>
                <Form.Label>Select Role</Form.Label>
                <Form.Select aria-label='select-role' name='role'>
                  <option value='student'>Student</option>
                  <option value='teacher'>Teacher</option>
                </Form.Select>
              </Form.Group>

              <Button variant='primary' type='submit' className='w-100'>
                Register
              </Button>
              <div className='text-center mt-3'>
                Already a user? <a href='./login'>Login</a>
              </div>
            </Form>
          </Col>
          <Col
            md={6}
            className='d-none d-md-flex align-items-center justify-content-center'
          >
            <img
              src='./images/register-image.jpg'
              alt='Login illustration'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: '0.25rem',
                borderBottomLeftRadius: '0.25rem',
              }}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Register;
