import { db, storage } from "../../config/firebase";
import {
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  setDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

/**
 * Add a teacher to the database with subcollections.
 * @param {Object} teacherData - An object containing teacher data.
 * @param {string} teacherData.teacherId - The unique identifier for the teacher.
 * @param {string} teacherData.designation - The designation of the teacher.
 * @param {string} teacherData.emailId - The emailId of the teacher.
 * @param {string} teacherData.firstName - The first name of the teacher.
 * @param {string} teacherData.lastName - The last name of the teacher.
 * @param {number} teacherData.mobileNo - The mobile number of the teacher.
 * @param {array} teacherData.classTeacher - An array of class names associated with the teacher.
 * @param {string} teacherData.transportSlab - The transport slab information.
 * @param {map} teacherData.personalDetailsData - The transport slab information.
 * @param {map} teacherData.salaryDetailsData - The transport slab information.
 * @param {map} teacherData.addressDetailsData - The transport slab information.
 * @param {map} teacherData.experienceDetailsData - The transport slab information.

 */

export const teacherDatatest = {
  teacherId: "th102", // Updated teacher ID
  designation: "Subject Teacher", // Updated designation
  emailId: "testteacher@gmail.com", // Updated email
  firstName: "John", // Updated first name
  lastName: "Smith", // Updated last name
  mobileNo: 9876543210, // Updated mobile number
  classTeacher: ["Class C", "Class D"], // Updated class teacher assignments
  transportSlab: "bus", // Updated transport slab

  personalDetails: {
    dob: new Date(1990, 5, 15), // Updated date of birth
    fatherName: "John Sr.", // Updated father's name
    motherName: "Mary", // Updated mother's name
    spouseName: "Jane", // Updated spouse's name
    sex: "female", // Updated gender
    cast: "New Cast", // Updated cast
    castCategory: "OBC", // Updated cast category
    bloodGroup: "B-", // Updated blood group
  },

  addressDetails: {
    address: "456 Elm Street", // Updated address
    city: "Another City", // Updated city
    zipCode: "54321", // Updated ZIP code
    state: "Another State", // Updated state
    homeTelephoneNo: "9876123456", // Updated home telephone number
  },

  salaryDetails: {
    basic: "abcxyz", // Updated basic salary
    acNo: 9876543210, // Updated account number
    lic: "xyzabc", // Updated LIC policy
    loan: "7500", // Updated loan amount
    pfApplied: "def", // Updated PF applied status
    pfNo: 9876543210, // Updated PF number
    previousYearSalary: 135792, // Updated previous year salary
    salaryAmount: 250000, // Updated salary amount
  },

  experienceDetails: {
    completionYear: "2019", // Updated completion year
    joiningDate: new Date(2017, 2, 10), // Updated joining date
    serviceInYears: 4, // Updated years of service
    confirmationDate: new Date(2017, 6, 20), // Updated confirmation date
    experienceSummary: "New job experience summary", // Updated experience summary
    oldPFNo: "987654", // Updated old PF number
    previousJob: "New Job Title", // Updated previous job title
    dateOfLeaving: new Date(2019, 10, 15), // Updated date of leaving
    dateOfConfirmation: new Date(2017, 8, 1), // Updated date of confirmation
    lastJobSalary: 60000, // Updated last job salary
    reasonForLeaving: "Personal reasons", // Updated reason for leaving
  },
};

export const addTeacherToDatabase = async (teacherData) => {
  const teacherRef = collection(db, "AddTeachers");

  try {
    const profilePicRef = ref(
      storage,
      `addTeacher/profile_pics/${teacherData.teacherId}`
    );
    await uploadString(profilePicRef, teacherData.profilePic, "data_url");
  } catch (error) {
    console.error("Error uploading profile picture to storage:", error);
    return {
      status: false,
      message: "Error uploading profile picture",
    };
  }

  const profilePicUrl = await getDownloadURL(
    ref(storage, `addTeacher/profile_pics/${teacherData.teacherId}`)
  );

  try {
    const teacherDoc = await addDoc(teacherRef, {
      teacherId: teacherData.teacherId,
      designation: teacherData.designation,
      emailId: teacherData.emailId,
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      mobileNo: teacherData.mobileNo,
      profilePic: profilePicUrl,
      classTeacher: teacherData.classTeacher,
      transportSlab: teacherData.transportSlab,
      personalDetails: teacherData.personalDetails,
      addressDetails: teacherData.addressDetails,
      salaryDetails: teacherData.salaryDetails,
      experienceDetails: teacherData.experienceDetails,
      assignClasses: teacherData.assignClasses,
      createdAt: serverTimestamp(),
    });

    console.log("data added succfully");
    return {
      status: true,
      message: "Teacher and subcollections added successfully",
      docId: teacherDoc.id,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error adding teacher and subcollections",
    };
  }
};

export const getTeacherFromDatabase = async () => {
  const teacherRef = collection(db, "AddTeachers");

  try {
    const q = query(teacherRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const teacherData = [];

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();

      const modifiedTeacherData = {
        id: doc.id,
        Name: data.firstName + " " + data.lastName,
        "Mobile No": data?.mobileNo || 0,
        Email: data.emailId,
        Salary: data.salaryDetails?.salaryAmount || 0,
        "Class Teacher": data.classTeacher || [],
        "Classes Assigned": ["4A, ", "6B, ", "5C"],
        "Employee Id": data?.teacherId,
      };

      teacherData.push(modifiedTeacherData);
    });

    return teacherData;
  } catch (error) {
    console.error(error);
  }
};

export const updateTeacherInDatabase = async (
  documentId,
  updatedTeacherData
) => {
  const teacherDocRef = doc(db, "AddTeachers", documentId);

  try {
    const teacherDocSnapshot = await getDoc(teacherDocRef);
    const existingData = teacherDocSnapshot.data();

    const teacherDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedTeacherData);
    console.log("Backend data:", existingData);
    console.log("Checking for changes:", teacherDataChanged);

    // Check if the image has changed
    const profilePicChanged =
      updatedTeacherData.profilePic !== existingData.profilePic;

    if (teacherDataChanged || profilePicChanged) {
      // If the image has changed, upload the new image to Firebase Storage
      if (profilePicChanged && updatedTeacherData.profilePic) {
        const profilePicRef = ref(
          storage,
          `addTeacher/profile_pics/${documentId}`
        );
        await uploadString(
          profilePicRef,
          updatedTeacherData.profilePic,
          "data_url"
        );

        // Get the URL of the uploaded profile picture
        const profilePicUrl = await getDownloadURL(profilePicRef);

        // Update the profilePic field in the teacher data
        updatedTeacherData.profilePic = profilePicUrl;
      }

      // Update the document in Firestore with the updated data
      await updateDoc(teacherDocRef, updatedTeacherData);

      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteTeacher = async (teacheId) => {
  const teachersRef = collection(db, "AddTeachers");
  const teacherDocRef = doc(teachersRef, teacheId);

  try {
    await deleteDoc(teacherDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificTeacherDataFromDd = async (DocId) => {
  try {
    const teacherDocRef = doc(db, "AddTeachers", DocId);
    const teacherDocSnapshot = await getDoc(teacherDocRef);

    if (teacherDocSnapshot.exists()) {
      console.log(teacherDocSnapshot.data());
      return teacherDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching subject data", error);
    throw error;
  }
};

// export const searchUser = async (searchTerm) => {
//   const studentRef = collection(db, 'AddStudentsDirectly');
//   const teacherRef = collection(db, 'AddTeachers');

//   try {
//     let studentQuery;
//     let teacherQuery;

//     // Check if searchTerm is a number (indicating ID search)
//     if (!isNaN(searchTerm)) {
//       studentQuery = query(studentRef, where('studentId', '==', searchTerm));
//       teacherQuery = query(teacherRef, where('teacherId', '==', searchTerm));
//     } else {
//       // If searchTerm is not a number, treat it as a name search
//       studentQuery = query(studentRef, where('firstName', '==', searchTerm));
//       teacherQuery = query(teacherRef, where('firstName', '==', searchTerm));
//     }

//     const studentSnapshot = await getDocs(studentQuery);
//     const students = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     const teacherSnapshot = await getDocs(teacherQuery);
//     const teachers = teacherSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     const searchResults = {
//       students: students,
//       teachers: teachers,
//     };

//     return searchResults;
//   } catch (error) {
//     console.error('Error searching users:', error);
//     throw error;
//   }
// };

export const searchUser = async (searchTerm) => {
  const studentRef = collection(db, "AddStudentsDirectly");
  const teacherRef = collection(db, "AddTeachers");

  try {
    const lowercaseTerm = searchTerm.toLowerCase(); // Convert searchTerm to lowercase for case-insensitive matching

    // Fetch all student names and IDs
    const studentQuery = query(studentRef);
    const studentSnapshot = await getDocs(studentQuery);
    const students = studentSnapshot.docs.map((doc) => ({
      id: doc.id,
      firstName: doc.data().firstName,
      studentId: doc.data().studentId,
    }));

    // Fetch all teacher names and IDs
    const teacherQuery = query(teacherRef);
    const teacherSnapshot = await getDocs(teacherQuery);
    const teachers = teacherSnapshot.docs.map((doc) => ({
      id: doc.id,
      firstName: doc.data().firstName,
      teacherId: doc.data().teacherId,
    }));

    // Filter student names based on the search term
    const filteredStudents = students.filter((student) =>
      student.firstName.toLowerCase().includes(lowercaseTerm)
    );

    // Filter teacher names based on the search term
    const filteredTeachers = teachers.filter((teacher) =>
      teacher.firstName.toLowerCase().includes(lowercaseTerm)
    );

    // Combine and return the results
    const searchResults = {
      students: filteredStudents,
      teachers: filteredTeachers,
    };

    return searchResults;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
