import { Container, Form, Button, Col, Row, Card } from 'react-bootstrap';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginWithEmailAndPassword, getRoleFromUser } = useFirebaseContext();
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
    const userCredentials = Object.fromEntries(formData);
    const { email, password } = userCredentials;
    const { res, err } = await loginWithEmailAndPassword(email, password);
    if (res) {
      toast.success('Login Successful!', {
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
      const role = await getRoleFromUser(res.user.email);
      if (role === 'teacher') {
        navigate(`/teacher/dashboard/`);
      } else {
        navigate(`/student/dashboard/`);
      }
    } else {
      toast.error(err.message, {
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
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '80%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Row>
          <Col
            md={6}
            className='d-none d-md-flex align-items-center justify-content-center'
          >
            <img
              src='./images/login-image.jpg'
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
          <Col xs={12} md={6} className='p-4'>
            <h2 className='text-center mb-4'>Login</h2>
            <Form onSubmit={handleSubmit}>
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

              <Button variant='primary' type='submit' className='w-100 mb-3'>
                Login
              </Button>

              <div className='text-center '>
                Not a user? <a href='./register'>Register</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;
