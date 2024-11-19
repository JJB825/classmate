import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useEffect, useState } from 'react';
import { showErrorToast, showSuccessToast } from '../../utils/notifications';

const EditProfileForm = () => {
  const { user, getRoleFromUser, updateProfile } = useFirebaseContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRoleFromUser(user?.email ?? 'vddhore@gmail.com').then((role) =>
      setRole(role)
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if ([...formData.values()].includes('')) {
      showErrorToast('Please fill all the values!');
      form.reset();
      return;
    }
    const formObject = Object.fromEntries(formData);
    await updateProfile(formObject);
    showSuccessToast('User Profile Successfully updated!');
    form.reset();
  };

  return (
    <div
      style={{
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Edit Profile
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formGridName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Enter name'
            style={{ width: '100%' }}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGridEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            style={{ width: '100%' }}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGridAddress1'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            placeholder='Enter Address'
            style={{ width: '100%' }}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGridMobNum'>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type='number'
            name='mobNum'
            placeholder='Enter mobile number'
            style={{ width: '100%' }}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGridRegNum'>
          <Form.Label>Registration Number</Form.Label>
          <Form.Control
            type='number'
            name='regNum'
            placeholder='Enter registration number'
            style={{ width: '100%' }}
          />
        </Form.Group>

        <div style={{ textAlign: 'center' }}>
          <Button variant='primary' type='submit'>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfileForm;
