import {db} from "../config/firebase";
import {addDoc, collection} from "firebase/firestore";

/**
 * Add a subject to the database.
 * @param {string} className - The class name to which the subject belongs.
 * @param {string} subjectName - The name of the subject.
 * @param {string} subjectId - The unique identifier for the subject.
 */

const addSubjectToDatabase = async (className, subjectId, subjectName) => {
    const studentsRef = collection(db, "subjects");
    try {
        await addDoc(studentsRef, {
            Class: className,
            Subject_Name: subjectName,
            Subject_Id: subjectId,
        });
        console.log("Document successfully written!");
    } catch (error) {
        console.log(error);
    }
}

export default addSubjectToDatabase;
