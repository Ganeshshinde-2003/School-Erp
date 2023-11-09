import { db } from "../../config/firebase";
import { doc,getDocs,addDoc, collection,updateDoc,deleteDoc,getDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore";
/**
 * Add a subject to the database.
 * @param {Object} optionalSubjectData - An object containing optionalsubject data.
 * @param {string} optionalSubjectData.subjectTotalMarks - The maximun marks which the subject belongs.
 * @param {string} optionalSubjectData.subjectName - The name of the subject.
 * @param {string} optionalSubjectData.subjectCode - The unique identifier for the subject.
 */
export const addOptionalSubjectToDatabase = async (optionalSubjectData) => {
    const subjectsRef = collection(db, "AddOptionalSubjects");

    const querySnapshot = await getDocs(query(subjectsRef, where("subjectCode", "==", optionalSubjectData.subjectCode)));
    
    if (!querySnapshot.empty) {
        return { status: false, message: "Subject with the same subjectCode already exists" };
    }

    try {
        await addDoc(subjectsRef, {
            subjectName: optionalSubjectData.subjectName,
            subjectTotalMarks:optionalSubjectData.subjectTotalMarks,
            subjectCode: optionalSubjectData.subjectCode,
            createdAt: serverTimestamp(),

        });
        console.log("Document successfully written!");
        return { status: true, message: "Document successfully added" };

    } catch (error) {
        console.log(error);
    }
};

export const getOptionalSubjectDatabase = async () => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    try {
        const q = query(subjectsRef, orderBy("createdAt", "asc")); // Add the orderBy query here

        const querySnapshot = await getDocs(q);

        const optionalSubjectData = [];
        
        querySnapshot.forEach((doc) => {
            
            const data = doc.data();
            const modifiedData = {
                "id": doc.id,                
                "Subject Code": data.subjectCode,
                "Subject Name": data.subjectName,
                "Subject Total Marks Reduced": data.subjectTotalMarks,
            };
            optionalSubjectData.push(modifiedData);

        });     
        return optionalSubjectData; // Return the optionalSubjectData
    } catch (error) {
        console.error(error);
    }
};

export const updateOptionalSubjectDatabase = async (documentId, updatedSubjectData) => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    const subjectDocRef = doc(subjectsRef, documentId); // Use Id to reference the specific document

    try {
        await updateDoc(subjectDocRef, updatedSubjectData);
        console.log("Document successfully updated!");
        return { status: true, message: "Document successfully updated" };
    } catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};


export const deleteOptionalSubject = async (subjectId) => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    const subjectDocRef = doc(subjectsRef, subjectId);

    try {
        await deleteDoc(subjectDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getOptionalSubjectDataFromDb = async (DocId) => {
    try {
      const subjectDocRef = doc(db, "AddOptionalSubjects", DocId);
      const subjectDocSnapshot = await getDoc(subjectDocRef);
  
      if (subjectDocSnapshot.exists()) {
        return subjectDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };

  