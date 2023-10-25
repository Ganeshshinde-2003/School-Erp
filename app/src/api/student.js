import {db} from "../config/firebase";
import {getDocs,addDoc, collection} from "firebase/firestore";

/**
 * Add a student to the database.
 * @param {number} attendancePercent - The attendance percentage of the student.
 * @param {number} attended - The number of classes attended by the student.
 * @param {string} className - The class name to which the student belongs.
 * @param {string} classId - The unique identifier for the class.
 * @param {string} division - The division of the student within the class.
 * @param {string} name - The name of the student.
 * @param {number} rollNo - The roll number of the student.
 * @param {number} totalClasses - The total number of classes in the subject.
 * @param {number} absent - The number of classes the student was absent for.
 * @param {string} id - The unique identifier for the student.
 * @param {string} password - The student's password.
 * @param {string[]} subjects - An array of subjects the student is enrolled in.
 */

export const addStudentToDatabase = async (attendancePercent,attended,className,classId,division,name,rollNo,totalClasses,absent,id,password,subjects
    ) => {
    const studentsRef = collection(db, "students");
    try {
        await addDoc(studentsRef, {
            Attendance_percent: attendancePercent,
            Attended:attended,
            Class:className,
            ClassId:classId,
            Division:division,
            Name:name,
            RollNo:rollNo,
            TotalClasses:totalClasses,
            absent:absent,
            id:id,
            password:password,
            subjects: subjects,
        });
        return { status: true, message: "Document successfully added" };
    } catch (error) {
        console.log(error);
    }
}

export const getStudentDatabase = async () => {
    const studentsRef = collection(db, "students");
    try {
        const querySnapshot = await getDocs(studentsRef);

        const studentData = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            delete data.password;
            
            studentData.push({
                id: doc.id,
                ...data
            });
        });
        return studentData; // Return the studentData
    } catch (error) {
        console.error(error);
    }
};
