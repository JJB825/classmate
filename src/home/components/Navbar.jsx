import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useFirebaseContext } from '../../context/FirebaseContext';
import Image from 'react-bootstrap/Image';

function MyNavbar() {
  const { user, logout } = useFirebaseContext();

  return (
    <Navbar fixed='top' className='bg-body-tertiary shadow'>
      <Container>
        <Navbar.Brand href='./'>
          <img
            alt='brand'
            src='./svg/react.svg'
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          ClassMate
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {user ? (
            <div className='d-flex align-items-center'>
              <Button
                variant='outline-primary'
                onClick={logout}
                className='me-2'
              >
                Logout
              </Button>
              <Image
                src='./svg/avatar.svg'
                alt='User Avatar'
                roundedCircle
                width='40'
                height='40'
                className='ms-2'
              />
            </div>
          ) : (
            <div className='d-flex'>
              <Button href='/login' variant='primary' className='me-2'>
                Login
              </Button>
              <Button href='/register' variant='outline-primary'>
                Register
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
