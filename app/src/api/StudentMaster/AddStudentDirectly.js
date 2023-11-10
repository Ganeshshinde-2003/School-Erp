import { db } from "../../config/firebase";
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
  setDoc,
} from "firebase/firestore";

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
  firstName: "Sara",
  lastName: "Singh",
  mobileNo: 9876543212,
  transportSlab: "cycle",
  admissionDate: new Date(2011, 2, 20),
  joiningClass: "8C",
  feeslab: "105000",

  personalDetailsData: {
    gender: "female",
    cast: "Different Cast",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    aadharNo: 987654321097,
    bloodGroup: "O+",
    guardianName: "father",
    guardianNo: 8292772486,
    telephoneNo: 9876543569,
    dob: new Date(1996, 4, 25),
    isSinglegirlchild: true,
    emailId: "student14@gmail.com",
  },

  addressDetailsData: {
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
};

export const addStudentDirectlyToDatabase = async (studentData) => {
  const studentRef = collection(db, "AddStudentsDirectly");
  try {
    const studentDoc = await addDoc(studentRef, {
      studentId: studentData.studentId,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      mobileNo: studentData.mobileNo,
      transportSlab: studentData.transportSlab,
      admissionDate: studentData.admissionDate,
      joiningClass: studentData.joiningClass,
      feeslab: studentData.feeslab,
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
      message: "Student and subcollections added successfully",
      docId: studentDoc.id,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding student and subcollections",
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

    if (studentDataChanged) {
      await updateDoc(studentDocRef, updatedStudentData);
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
