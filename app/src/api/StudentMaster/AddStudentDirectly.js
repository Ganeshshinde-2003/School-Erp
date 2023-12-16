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
 * Add a student to the database with subcollections.
 * @param {Object} studentData - An object containing student data.
 * @param {string} studentData.studentId - The unique identifier for the student.
 * @param {string} studentData.firstName - The first name of the student.
 * @param {string} studentData.lastName - The last name of the student.
 * @param {number} studentData.mobileNo - The mobile number of the student.
 * @param {string} studentData.transportSlab - The transport slab information.
 * @param {Date} studentData.admissionDate - The admission date of the student.
 * @param {string} studentData.joiningClass - The class in which the student is joining.
 * @param {string} studentData.feeslab - The fee slab for the student.
 * @param {Object} studentData.personalDetailsData - Personal details of the student.
 * @param {Object} studentData.addressDetailsData - Address details of the student.
 * @param {Object} studentData.takeAdmissionfees - Admission fees details for the student.
 * @param {Object} studentData.demography - Demographic details of the student.
 * @param {Object} studentData.studentHistory - Student's historical data.
 * @returns {Object} An object with a status and message indicating the result.
 */

export const studentDataTest = {
  studentId: "th103",
  firstName: "Sara ali",
  lastName: "Singh",
  transportSlab: "cycle",
  admissionDate: new Date(2011, 2, 20),
  joiningClass: "8C",
  feeslab: "105000",

  personalDetails: {
    gender: "female",
    cast: "Different Cast",
    fatherName: "Rajesh Sharma",
    telephoneNo: 9876543569,
    dob: new Date(1996, 4, 25),
    isSinglegirlchild: true,
    emailId: "student14@gmail.com",
  },

  addressDetails: {
    homeAddress: "789 Oak Avenue",
    city: "New City",
    zipCode: "54321",
    state: "New State",
    fatherMobileNo: "9876123458",
  },

  takeAdmissionfees: {
    admissonFeeStatus: true,
    makeOfPayment: 1500,
    payableAmount: 12000,
    modeOfPayment: "credit card",
    chequeNo: "ICICIchhh727638792t",
    upitransactionNo: "92673r7797t38798tguyt77",
    otherUniqeNo: "other873678576ew2",
  },

  demography: {
    religion: "Christian",
    cast: "Another Cast",
    fatherOccupation: "Engineer",
    motherOccupation: "Teacher",
    parentIncome: 120000,
    motherTongue: "English",
    birthplace: "Mumbai",
    nationality: "Indian",
  },

  studentHistory: {
    previousSchoolName: "ABC School",
    PreviousschoolTCNo: "TC987654",
    previousClassPercentage: "92%",
    importantDocsTaken: true,
  },
  optionalSubjects: ["ghgj", "jhgjk"],
};

export const addStudentDirectlyToDatabase = async (studentData) => {
  const studentRef = collection(db, "AddStudentsDirectly");

  try {
    const profilePicRef = ref(
      storage,
      `addStudentDirectly/profile_pics/${studentData.studentId}`
    );
    await uploadString(profilePicRef, studentData.profilePic, "data_url");
  } catch (error) {
    console.error("Error uploading profile picture to storage:", error);
    return {
      status: false,
      message: "Error uploading profile picture",
    };
  }

  const profilePicUrl = await getDownloadURL(
    ref(storage, `addStudentDirectly/profile_pics/${studentData.studentId}`)
  );

  try {
    const studentDoc = await addDoc(studentRef, {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      studentId: studentData.studentId,
      mobileNo: studentData.mobileNo,
      transportSlab: studentData.transportSlab,
      profilePic: profilePicUrl,
      admissionDate: studentData.admissionDate,
      joiningClass: studentData.joiningClass,
      feeslab: studentData?.feeslab,
      personalDetails: studentData?.personalDetails,
      addressDetails: studentData?.addressDetails,
      takeAdmissionfees: studentData?.takeAdmissionfees,
      demography: studentData?.demography,
      studentHistory: studentData?.studentHistory,
      optionalSubjects: studentData?.optionalSubjects,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Student added in db successfully",
      docId: studentDoc.id,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding student in db",
    };
  }
};

export const updateStudentDirectlyToDatabase = async (
  documentId,
  updatedStudentData
) => {
  const studentDocRef = doc(db, "AddStudentsDirectly", documentId);

  try {
    const studentDocSnapshot = await getDoc(studentDocRef);
    const existingData = studentDocSnapshot.data();

    const studentDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedStudentData);
    console.log("Backend data:", existingData);
    console.log("Checking for changes:", studentDataChanged);

    // Check if the image has changed
    const profilePicChanged =
      updatedStudentData.profilePic !== existingData.profilePic;

    if (studentDataChanged || profilePicChanged) {
      // If the image has changed, upload the new image to Firebase Storage
      if (profilePicChanged && updatedStudentData.profilePic) {
        const profilePicRef = ref(
          storage,
          `addStudentDirectly/profile_pics/${documentId}`
        );
        await uploadString(
          profilePicRef,
          updatedStudentData.profilePic,
          "data_url"
        );

        // Get the URL of the uploaded profile picture
        const profilePicUrl = await getDownloadURL(profilePicRef);

        // Update the profilePic field in the student data
        updatedStudentData.profilePic = profilePicUrl;
      }

      // Update the document in Firestore with the updated data
      await updateDoc(studentDocRef, updatedStudentData);

      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteStudent = async (docId) => {
  const studentRef = collection(db, "AddStudentsDirectly");
  const studentDocRef = doc(studentRef, docId);

  try {
    await deleteDoc(studentDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getStudentDataFromDd = async (DocId) => {
  try {
    const studentDocRef = doc(db, "AddStudentsDirectly", DocId);
    const studentDocSnapshot = await getDoc(studentDocRef);

    if (studentDocSnapshot.exists()) {
      console.log(studentDocSnapshot.data());
      return studentDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching subject data", error);
    throw error;
  }
};
