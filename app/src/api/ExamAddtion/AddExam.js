import { db } from "../../config/firebase";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  where,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Add a Exam to the database.
 * @param {Object} examData - An object containing subject data.
 * @param {string} examData.subjectTotalMarks - The maximun marks which the subject belongs.
 * @param {string} examData.subjectName - The name of the subject.
 * @param {string} examData.subjectCode - The unique identifier for the subject.
 */

export const examData = {
  examName: "Midterm Exam",
  totalExamMarksReduced: 50,
  classesAndSubjects: [
    {
      className: "Class3",
      subjects: ["Math", "History", "Physics"],
      optionalSubjects: ["Computer Science", "Art"],
    },
    {
      className: "Class4",
      subjects: ["Chemistry", "Biology", "English"],
      optionalSubjects: ["Music", "Geography"],
    },
  ],
  freezeDate: new Date("2023-11-15"), // Replace with your desired date
};

export const addExamToDatabase = async (examData) => {
  const examRef = collection(db, "AddExams");

  try {
    await addDoc(examRef, {
      examName: examData.examName,
      totalExamMarksReduced: examData.totalExamMarksReduced,
      classesAndSubjects: examData.classesAndSubjects,
      freezeDate: examData.freezeDate,
      createdAt: serverTimestamp(),
    });
    return { status: true, message: "Exam Document successfully added" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Error adding with exam document" };
  }
};

export const getExamsDatabase = async () => {
  const examRef = collection(db, "AddExams");
  try {
    const q = query(examRef, orderBy("createdAt", "asc"));

    const querySnapshot = await getDocs(q);

    const examData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const modifiedData = {
        id: doc.id,
        "Exam Name": data.examName,
        "Total Exam Marks Reduced": data.totalExamMarksReduced,
        "Marks Freeze Date": data.freezeDate,
      };
      examData.push(modifiedData);
    }
    console.log(examData);
    return examData;
  } catch (error) {
    console.error(error);
  }
};

export const updateExamInDatabase = async (documentId, updatedSubjectData) => {
  const examRef = collection(db, "AddExams");
  const examDocRef = doc(examRef, documentId); // Use Id to reference the specific document

  try {
    await updateDoc(examDocRef, updatedSubjectData);
    return { status: true, message: "Document successfully updated" };
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteExam = async (subjectId) => {
  const examRef = collection(db, "AddExams");
  const examDocRef = doc(examRef, subjectId);

  try {
    await deleteDoc(examDocRef);
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificExamData = async (DocId) => {
  try {
    const subjectDocRef = doc(db, "AddExams", DocId);
    const subjectDocSnapshot = await getDoc(subjectDocRef);

    if (subjectDocSnapshot.exists()) {
      console.log(subjectDocSnapshot.data());
      return subjectDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching subject data", error);
    throw error;
  }
};
