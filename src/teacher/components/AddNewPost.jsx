import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { fileUpload } from '../../utils/fileFunctionality';
import { showErrorToast, showSuccessToast } from '../../utils/notifications';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useParams } from 'react-router-dom';

const AddNewPost = (props) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { createNewPost } = useFirebaseContext();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newPost = {
      title: formData.get('title'),
      description: formData.get('description'),
      files: [],
    };

    setIsLoading(true);

    if (files.length > 0) {
      const { uploadedFiles, error } = await fileUpload(
        'material',
        files,
        { description: newPost.description || 'No description provided' } // Pass metadata
      );

      if (uploadedFiles) {
        newPost.files = uploadedFiles;
        showSuccessToast('Files uploaded successfully!');
      } else if (error) {
        showErrorToast(error.message || 'Error occurred in uploading files');
        return;
      }
    }
    const { res, err } = await createNewPost(
      params.courseId,
      newPost.title,
      newPost.description,
      newPost.files
    );
    if (res) {
      showSuccessToast(res);
    } else if (err) {
      showErrorToast(err);
    }
    setIsLoading(false);

    // Reset form and state
    setFiles([]);
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
          Add New Post
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
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Button variant='primary' type='submit'>
              {isLoading ? 'Creating new post...' : 'Submit'}
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

export default AddNewPost;
