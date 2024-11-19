import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    image: './images/user1.jpg',
    name: 'John Doe',
    role: 'Teacher',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae urna nec urna vehicula cursus. Integer ac sem quam.',
  },
  {
    id: 2,
    image: './images/user2.jpg',
    name: 'Jane Smith',
    role: 'Student',
    text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
  },
  {
    id: 3,
    image: './images/user3.jpg',
    name: 'Alice Brown',
    role: 'Teacher',
    text: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a.',
  },
];

const Testimonials = () => {
  return (
    <Container className='py-5'>
      <div className='text-center mb-4'>
        <h2>Read what our clients say</h2>
        <p className='text-muted'>
          We have been working with clients around the world
        </p>
      </div>

      <Row className='justify-content-center'>
        {testimonials.map((testimonial) => (
          <Col
            key={testimonial.id}
            md={4}
            className='d-flex justify-content-center mb-4'
          >
            <div className='book'>
              <Card.Body>
                <Card.Text className='mt-3'>{testimonial.text}</Card.Text>
              </Card.Body>
              <div className='cover'>
                <>
                  <Image
                    src={testimonial.image}
                    alt='Client Avatar'
                    roundedCircle
                    className='mx-auto mt-3'
                    style={{ width: '80px', height: '80px' }}
                  />
                  <Card.Body>
                    <Card.Title as='h6' className='mt-4 mb-0'>
                      {testimonial.name}
                    </Card.Title>
                    <p className='text-muted'>{testimonial.role}</p>
                  </Card.Body>
                </>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
