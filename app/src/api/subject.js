import { db } from "../config/firebase";
import { getDoc,getDocs,addDoc, collection } from "firebase/firestore";
// import {getDocs, collection} from "firebase/firestore";
/**
 * Add a subject to the database.
 * @param {Object} subjectData - An object containing subject data.
 * @param {string} subjectData.className - The class name to which the subject belongs.
 * @param {string} subjectData.subjectName - The name of the subject.
 * @param {string} subjectData.subjectId - The unique identifier for the subject.
 */
export const addSubjectToDatabase = async (subjectData) => {
    const subjectsRef = collection(db, "subjects");
    try {
        await addDoc(subjectsRef, {
            Class: subjectData.className,
            Subject_Name: subjectData.subjectName,
            Subject_Id: subjectData.subjectId,
        });
        console.log("Document successfully written!");
        return { status: true, message: "Document successfully added" };

    } catch (error) {
        console.log(error);
    }
};

export const getSubjectDatabase = async () => {
    const subjectsRef = collection(db, "subjects");
    try {
        const querySnapshot = await getDocs(subjectsRef);

        const subjectData = [];
        
        querySnapshot.forEach((doc) => {
            subjectData.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return subjectData; // Return the subjectdata
    } catch (error) {
        console.error(error);
    }
};

