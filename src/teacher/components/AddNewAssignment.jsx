import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { fileUpload } from '../../utils/fileFunctionality';
import { showErrorToast, showSuccessToast } from '../../utils/notifications';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useParams } from 'react-router-dom';

const AddNewAssignment = (props) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const { createNewAssignment } = useFirebaseContext();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newAssignment = {
      title: formData.get('title'),
      description: formData.get('description'),
      deadline: deadline,
      files: [],
    };

    setIsLoading(true);

    if (files.length > 0) {
      const { uploadedFiles, error } = await fileUpload(
        'assignment',
        files,
        { description: newAssignment.description || 'No description provided' } // Pass metadata
      );

      if (uploadedFiles) {
        newAssignment.files = uploadedFiles;
        showSuccessToast('Files uploaded successfully!');
      } else if (error) {
        showErrorToast(error.message || 'Error occurred in uploading files');
        return;
      }
    }

    const { res, err } = await createNewAssignment(
      params.courseId,
      newAssignment.title,
      newAssignment.description,
      newAssignment.files,
      newAssignment.deadline
    );
    if (res) {
      showSuccessToast(res);
    } else if (err) {
      showErrorToast(err);
    }
    setIsLoading(false);

    setFiles([]);
    setDeadline(new Date());
    form.reset();
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
          Add New Assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formGroupTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' name='title' placeholder='Enter title' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupDesc'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              name='description'
              placeholder='Enter description'
            />
          </Form.Group>
          <Form.Group controlId='formFileMultiple' className='mb-3'>
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type='file'
              multiple
              onChange={(event) => setFiles(event.target.files)}
            />
          </Form.Group>
          <Form.Group controlId='formGroupDeadline' className='mb-3'>
            <Form.Label>Set Deadline</Form.Label>
            <div>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                showTimeSelect
                dateFormat='Pp'
                placeholderText='Select deadline'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                  fontSize: '16px',
                }}
              />
            </div>
          </Form.Group>
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Button variant='primary' type='submit'>
              {isLoading ? 'Creating new assignment...' : 'Submit'}
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

export default AddNewAssignment;
