import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

/**
 * Add a teacher to the database.
 * @param {Object} teacherData - An object containing teacher data.
 * @param {string} teacherData.id - The id of the teacher.
 * @param {string} teacherData.name - The name of the teacher.
 * @param {string} teacherData.password - The password of the teacher.
 * @param {string[]} teacherData.className - The class name associated with the teacher.
 * @param {string[]} teacherData.subjectName - The name of the subject taught by the teacher.
 * @param {string[]} teacherData.subjectId - The unique identifier for the subject taught by the teacher.
 */
const addTeacherToDatabase = async (teacherData) => {
    const teacherRef = collection(db, "teachers");
    try {
        await addDoc(teacherRef, {
            id: teacherData.id,
            Name: teacherData.name,
            password:teacherData.password,
            classes: teacherData.className,
            sub_names:teacherData.subjectName,
            subject: teacherData.subjectId,
        });
        console.log("Document successfully added to teachers database!");
    } catch (error) {
        console.log(error);
    }
};

export default addTeacherToDatabase;


