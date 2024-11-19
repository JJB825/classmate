import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebaseContext } from '../../context/FirebaseContext';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { getRequestsforMe, user } = useFirebaseContext();

  useEffect(() => {
    getRequestsforMe(user?.email ?? 'vddhore@gmail.com').then(
      (querySnapshot) => {
        setRequests(querySnapshot.docs.map((doc) => doc.data()));
      }
    );
  }, []);

  return (
    <Container
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      {/* Heading */}
      <h2 className='text-center mb-4'>Student Requests</h2>

      {/* List Group */}
      <ListGroup>
        {requests.map((request, index) => (
          <ListGroup.Item
            key={index}
            className='d-flex flex-column mb-3'
            style={{ borderRadius: '10px', border: '1px solid #ddd' }}
          >
            {/* Card for each request */}
            <Card style={{ border: 'none' }}>
              <Card.Body>
                <h5 className='mb-3'>{request.studentEmail}</h5>
                <p className='text-muted'>{request.message}</p>
                <div className='d-flex justify-content-end gap-3'>
                  <Button variant='success'>Approve</Button>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Requests;
