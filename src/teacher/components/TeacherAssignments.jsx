import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useParams } from 'react-router-dom';

const TeacherAssignments = (props) => {
  const [responses, setResponses] = useState([]);
  const { getStudentSolutions } = useFirebaseContext();
  const params = useParams();

  useEffect(() => {
    getStudentSolutions(params.courseId, params.assignmentId).then(
      (querySnapshot) => {
        setResponses(querySnapshot.docs);
      }
    );
  }, []);

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Student Solutions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {responses.map((response) => {
            const { doneBy, files } = response.data();
            return (
              <ListGroup.Item key={response.id}>
                <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Student: {doneBy}
                </h5>
                {files && files.length > 0 && (
                  <div>
                    <strong>Files:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                      {files.map((file, fileIndex) => (
                        <li key={fileIndex} style={{ marginBottom: '5px' }}>
                          <a
                            href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{
                              color: '#007bff',
                              textDecoration: 'none',
                            }}
                          >
                            {file.fileName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default TeacherAssignments;
