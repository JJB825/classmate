import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Features.css';

const Features = () => {
  return (
    <Container className='py-5' id='features'>
      <h2 className='text-center mb-4'>How It Works</h2>
      <Row className='text-center'>
        <Col md={4} className='mb-4'>
          <div className='parent'>
            <div className='fcard'>
              <div className='content-box'>
                <span className='card-title'>Step 1</span>
                <p className='card-content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tenetur nesciunt sint nemo omnis laboriosam illo?
                </p>
              </div>
              <div className='date-box'>
                <Image src='./images/register.png' alt='Step 1' fluid />
              </div>
            </div>
          </div>
        </Col>

        <Col md={4} className='mb-4'>
          <div className='parent'>
            <div className='fcard'>
              <div className='content-box'>
                <span className='card-title'>Step 2</span>
                <p className='card-content'>
                  Ullam, saepe quos praesentium exercitationem aspernatur enim
                  nam maiores facilis, placeat magnam necessitatibus dolorem
                  voluptas!
                </p>
              </div>
              <div className='date-box'>
                <Image src='./images/notes.png' alt='Step 2' fluid />
              </div>
            </div>
          </div>
        </Col>

        <Col md={4} className='mb-4'>
          <div className='parent'>
            <div className='fcard'>
              <div className='content-box'>
                <span className='card-title'>Step 3</span>
                <p className='card-content'>
                  Vero libero a impedit accusamus quam reprehenderit optio
                  corporis aperiam, dignissimos debitis, laborum quod adipisci
                  cupiditate quisquam!
                </p>
              </div>
              <div className='date-box'>
                <Image src='./svg/assignment.svg' alt='Step 3' fluid />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features;
