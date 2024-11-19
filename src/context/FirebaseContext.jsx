// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAyUrdHSDiTZbeVJ8KOLrmazgkQOBNnswE',
  authDomain: 'classmate-3efc9.firebaseapp.com',
  projectId: 'classmate-3efc9',
  storageBucket: 'classmate-3efc9.firebasestorage.app',
  messagingSenderId: '101116110297',
  appId: '1:101116110297:web:939e06660d7b057f49a5c8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const FirebaseContext = createContext(null);
export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUpWithEmailAndPassword = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      return { res: 'Name of user added successfully', err: null };
    } catch (error) {
      return { res: null, err: 'Error occurred: ' + error.message };
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    let res;
    let err;
    try {
      res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      err = error;
    }
    return { res, err };
  };

  const logout = () => signOut(auth);

  const addNewUser = async (email, role) => {
    const docRef = await addDoc(collection(db, 'users'), {
      email: email,
      role: role,
    });
    return docRef;
  };

  const getRoleFromUser = async (userEmail) => {
    const q = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    const role = querySnapshot.docs[0].data().role;
    return role;
  };

  const addNewCourse = async (course, email) => {
    try {
      const { courseName, courseCode, teacherName } = course;
      await addDoc(collection(db, 'courses'), {
        courseName: courseName,
        courseCode: courseCode,
        taughtBy: teacherName,
        teacherEmail: email,
      });
      return { res: 'New Course created successfully', err: null };
    } catch (error) {
      return { res: null, err: 'Error occurred: ' + error.message };
    }
  };

  const getCoursesTaughtByMe = async (email) => {
    const q = query(
      collection(db, 'courses'),
      where('teacherEmail', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  };

  const getCourse = async (courseId) => {
    const docRef = doc(db, 'courses', courseId);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  const createNewPost = async (courseId, title, description, files) => {
    try {
      await addDoc(collection(db, 'courses', courseId, 'posts'), {
        title: title,
        description: description,
        files: files,
      });
      return { res: 'New Post created successfully', err: null };
    } catch (error) {
      return { res: null, err: 'Error occurred: ' + error.message };
    }
  };

  const createNewAssignment = async (
    courseId,
    title,
    description,
    files,
    deadline
  ) => {
    try {
      await addDoc(collection(db, 'courses', courseId, 'assignments'), {
        title: title,
        description: description,
        files: files,
        deadline: deadline,
      });
      return { res: 'New Assignment created successfully', err: null };
    } catch (error) {
      return { res: null, err: 'Error occurred: ' + error.message };
    }
  };

  const getAllPosts = async (courseId) => {
    const querySnapshot = await getDocs(
      collection(db, 'courses', courseId, 'posts')
    );
    return querySnapshot;
  };

  const getAllAssignments = async (courseId) => {
    const querySnapshot = await getDocs(
      collection(db, 'courses', courseId, 'assignments')
    );
    return querySnapshot;
  };

  const updateProfile = async ({ name, email, address, mobNum, regNum }) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;

    await updateDoc(userRef, {
      name: name,
      address: address,
      mobileNumber: mobNum,
      registrationNumber: regNum,
    });
  };

  const getAllCourses = async () => {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    return querySnapshot;
  };

  const getCourseIdFromName = async (courseName) => {
    const q = query(
      collection(db, 'courses'),
      where('courseName', '==', courseName)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].id;
  };

  const generateRequests = async (type, studentEmail, courseName, message) => {
    const q = query(
      collection(db, 'courses'),
      where('courseName', '==', courseName)
    );
    const querySnapshot = await getDocs(q);
    const teacherEmail = querySnapshot.docs[0].data().teacherEmail;
    const result = await addDoc(collection(db, 'requests'), {
      studentEmail: studentEmail,
      teacherEmail: teacherEmail,
      message: message,
      type: type,
    });
    return result;
  };

  const getRequestsforMe = async (email) => {
    const q = query(
      collection(db, 'requests'),
      where('teacherEmail', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  };

  const addStudentToCourse = async (courseId, name, email) => {
    try {
      await addDoc(collection(db, 'courses', courseId, 'students'), {
        name: name,
        email: email,
      });
      return { res: 'New Student registered successfully', err: null };
    } catch (error) {
      return { res: null, err: 'Error occurred: ' + error.message };
    }
  };

  const updateStudentUsers = async (email, courseName) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;

    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseName),
    });
  };

  const getEnrolledCourses = async (email) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    let courses = [];
    const querySnapshot = await getDocs(q);
    const enrolledCourses = querySnapshot.docs[0].data().enrolledCourses;
    for (let index = 0; index < enrolledCourses.length; index++) {
      const course = enrolledCourses[index];
      const q1 = query(
        collection(db, 'courses'),
        where('courseName', '==', course)
      );
      const snapshot = await getDocs(q1);
      courses.push(snapshot.docs[0]);
    }
    return courses;
  };

  const addStudentSolutions = async (courseId, assignmentId, email, files) => {
    try {
      await addDoc(
        collection(
          db,
          'courses',
          courseId,
          'assignments',
          assignmentId,
          'responses'
        ),
        {
          doneBy: email,
          files: files,
        }
      );
      return { res: 'Your work is uploaded successfully', err: null };
    } catch (error) {
      return { res: null, err: 'Error occurred: ' + error.message };
    }
  };

  const getStudentSolutions = async (courseId, assignmentId) => {
    const querySnapshot = await getDocs(
      collection(
        db,
        'courses',
        courseId,
        'assignments',
        assignmentId,
        'responses'
      )
    );
    return querySnapshot;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        addNewUser,
        loginWithEmailAndPassword,
        user,
        logout,
        getRoleFromUser,
        addNewCourse,
        getCourse,
        getCoursesTaughtByMe,
        createNewPost,
        createNewAssignment,
        getAllPosts,
        getAllAssignments,
        updateProfile,
        getAllCourses,
        generateRequests,
        getRequestsforMe,
        addStudentToCourse,
        getCourseIdFromName,
        updateStudentUsers,
        getEnrolledCourses,
        addStudentSolutions,
        getStudentSolutions,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
