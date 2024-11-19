import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-primary text-white py-2'>
      <Container>
        <Row className='text-center'>
          <p className='medium'>
            &copy; {new Date().getFullYear()} ClassMate. All Rights Reserved.
          </p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
