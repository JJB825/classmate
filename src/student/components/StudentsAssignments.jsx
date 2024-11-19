import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { fileUpload } from '../../utils/fileFunctionality';
import { showErrorToast, showSuccessToast } from '../../utils/notifications';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useParams } from 'react-router-dom';

const StudentsAssignments = (props) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addStudentSolutions, user } = useFirebaseContext();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let uploadedSolutions = [];

    setIsLoading(true);

    if (files.length > 0) {
      const { uploadedFiles, error } = await fileUpload('solution', files, {
        description: 'Assignment solution files',
      });

      if (uploadedFiles) {
        uploadedSolutions = uploadedFiles;
        showSuccessToast('Files uploaded successfully!');
      } else if (error) {
        showErrorToast(error.message || 'Error occurred in uploading files');
        return;
      }
    }

    const { res, err } = await addStudentSolutions(
      params.courseId,
      params.assignmentId,
      user?.email ?? 'jjbandodkar_b22@ce.vjti.ac.in',
      uploadedSolutions
    );
    if (res) {
      showSuccessToast(res);
    } else if (err) {
      showErrorToast(err);
    }

    setIsLoading(false);
    setFiles([]);
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Upload Assignment Solution
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formFileMultiple' className='mb-3'>
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type='file'
              multiple
              onChange={(event) => setFiles(event.target.files)}
            />
          </Form.Group>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Button variant='primary' type='submit'>
              {isLoading ? 'Uploading files...' : 'Submit'}
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
export default StudentsAssignments;
