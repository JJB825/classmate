import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { user, getRoleFromUser } = useFirebaseContext();
  const navigate = useNavigate();

  const redirect = async () => {
    if (user) {
      const role = await getRoleFromUser(user.email);
      if (role === 'teacher') {
        navigate(`/teacher/dashboard/`);
      } else {
        navigate(`/student/dashboard/`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Container fluid className='py-5 px-4 bg-light'>
      <Row className='align-items-center py-4'>
        {/* Text Section */}
        <Col md={6} className='text-center text-md-start'>
          <h1 className='display-4 fw-bold'>Welcome to Our Platform</h1>
          <p className='lead my-4'>
            Discover how our platform can help you achieve your goals with ease
            and efficiency. Explore all the features we have to offer and get
            started today!
          </p>
          <div>
            <Button variant='primary' className='me-2' onClick={redirect}>
              Get Started
            </Button>
            <Button variant='outline-primary' href='#features'>
              How It Works
            </Button>
          </div>
        </Col>

        {/* Image Section */}
        <Col md={6} className='text-center'>
          <Image src='./images/heroImage.jpg' alt='Hero Image' fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
