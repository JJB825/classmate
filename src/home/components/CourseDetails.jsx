import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import AddNewPost from '../../teacher/components/AddNewPost';
import AddNewAssignment from '../../teacher/components/AddNewAssignment';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { useNavigate, useParams } from 'react-router-dom';
import StudentsAssignments from '../../student/components/StudentsAssignments';
import TeacherAssignments from '../../teacher/components/TeacherAssignments';

const CourseDetails = () => {
  const { user, getRoleFromUser, getAllPosts, getCourse, getAllAssignments } =
    useFirebaseContext();
  const [role, setRole] = useState(null);
  const [course, setCourse] = useState(null);
  const [posts, setPosts] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [postModalShow, setPostModalShow] = useState(false);
  const [assignmentModalShow, setAssignmentModalShow] = useState(false);
  const [solutionModalShow, setSolutionModalShow] = useState(false);
  const [responseModalShow, setResponseModalShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoleFromUser(user?.email).then((role) => setRole(role));
  }, [user?.email, getRoleFromUser]);

  useEffect(() => {
    getCourse(params.courseId).then((docSnap) => {
      setCourse(docSnap.data());
    });
  }, []);

  useEffect(() => {
    getAllPosts(params.courseId).then((querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [params.courseId, getAllPosts]);

  useEffect(() => {
    getAllAssignments(params.courseId).then((querySnapshot) => {
      setAssignments(querySnapshot.docs);
    });
  }, [params.courseId, getAllAssignments]);

  const handleClick = (assignmentId) => {
    if (role === 'student') {
      setSolutionModalShow(true);
      navigate(
        `/student/courses/${params.courseId}/assignments/${assignmentId}`
      );
    } else {
      setResponseModalShow(true);
      navigate(
        `/teacher/courses/${params.courseId}/assignments/${assignmentId}`
      );
    }
  };

  return (
    <div>
      {/* Top Box with Background Image */}
      <div
        style={{
          width: '100%',
          height: '250px',
          backgroundImage: "url('../../../images/education.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          borderRadius: '10px',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        {/* Course Title */}
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {course?.courseName ?? 'Course Title'}
        </h1>

        {/* Course Code and Teacher Name */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '20px',
            textAlign: 'right',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'normal' }}>
            {course?.courseCode ?? 'Course Code'}
          </h3>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'normal' }}>
            {course?.taughtBy ?? 'Teacher Name'}
          </h3>
        </div>
      </div>

      {/* Assignments Section */}
      <h2 style={{ marginBottom: '15px', color: '#007bff' }}>Assignments</h2>
      <ListGroup>
        {assignments.map((assignment) => {
          const { title, description, files } = assignment.data();
          return (
            <ListGroup.Item
              key={assignment.id}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
            >
              <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                {title}
              </h5>
              <p style={{ marginBottom: '10px' }}>{description}</p>
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
              {role === 'student' ? (
                <Button
                  variant='success'
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                  }}
                  onClick={() => handleClick(assignment.id)}
                >
                  Upload Solution
                </Button>
              ) : (
                <Button
                  variant='success'
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                  }}
                  onClick={() => handleClick(assignment.id)}
                >
                  View Solution
                </Button>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {/* Posts Section */}
      <h2 style={{ marginTop: '30px', marginBottom: '15px', color: '#007bff' }}>
        Posts
      </h2>
      <ListGroup>
        {posts.map((post, index) => (
          <ListGroup.Item
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {post.title}
            </h5>
            <p style={{ marginBottom: '10px' }}>{post.description}</p>
            {post.files && post.files.length > 0 && (
              <div>
                <strong>Files:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                  {post.files.map((file, fileIndex) => (
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
        ))}
      </ListGroup>

      {/* Add Post and Assignment Buttons */}
      {role === 'teacher' && (
        <div
          style={{
            margin: '20px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <Button variant='success' onClick={() => setPostModalShow(true)}>
            Add new post
          </Button>
          <Button
            variant='success'
            onClick={() => setAssignmentModalShow(true)}
          >
            Add new assignment
          </Button>
        </div>
      )}

      {/* Modals */}
      <AddNewPost show={postModalShow} onHide={() => setPostModalShow(false)} />
      <AddNewAssignment
        show={assignmentModalShow}
        onHide={() => setAssignmentModalShow(false)}
      />
      <StudentsAssignments
        show={solutionModalShow}
        onHide={() => setSolutionModalShow(false)}
      />
      <TeacherAssignments
        show={responseModalShow}
        onHide={() => setResponseModalShow(false)}
      />
    </div>
  );
};

export default CourseDetails;
