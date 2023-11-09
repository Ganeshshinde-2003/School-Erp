import { db } from "../../config/firebase";
import { doc,getDocs,addDoc, collection,updateDoc,deleteDoc,getDoc, where, query, orderBy, serverTimestamp } from "firebase/firestore";

/**
 * Add a subject to the database.
 * @param {Object} subjectData - An object containing subject data.
 * @param {string} subjectData.subjectTotalMarks - The maximun marks which the subject belongs.
 * @param {string} subjectData.subjectName - The name of the subject.
 * @param {string} subjectData.subjectCode - The unique identifier for the subject.
 */

export const addSubjectToDatabase = async (subjectData) => {
    const subjectsRef = collection(db, "AddSubjects");
    
    // Check if subjectCode already exists
    const querySnapshot = await getDocs(query(subjectsRef, where("subjectCode", "==", subjectData.subjectCode)));
    
    if (!querySnapshot.empty) {
        return { status: false, message: "Subject with the same subjectCode already exists" };
    }
    
    try {
        await addDoc(subjectsRef, {
            subjectName: subjectData.subjectName,
            subjectTotalMarks: subjectData.subjectTotalMarks,
            subjectCode: subjectData.subjectCode,
            createdAt: serverTimestamp(),

        });
        return { status: true, message: "Document successfully added" };
    } catch (error) {
        console.error(error);
        return { status: false, message: "Error adding document" };
    }
};



export const getAddSubjectDatabase = async () => {
    const subjectsRef = collection(db, "AddSubjects");
    try {
        const q = query(subjectsRef, orderBy("createdAt", "asc")); // Add the orderBy query here

        const querySnapshot = await getDocs(q);
        
        const subjectData = [];
        
        querySnapshot.forEach(async (doc) => {
          
            const data = doc.data();
            const modifiedData = {
                "id": doc.id,                
                "Subject Code": data.subjectCode,
                "Subject Name": data.subjectName,
                "Subject Total Marks Reduced": data.subjectTotalMarks,
            };
            subjectData.push(modifiedData);

        });     

        return subjectData; // Return the subjectdata
    } catch (error) {
        console.error(error);
    }
};

export const updateSubjectInDatabase = async (documentId, updatedSubjectData) => {
    const subjectsRef = collection(db, "AddSubjects");
    const subjectDocRef = doc(subjectsRef, documentId); // Use Id to reference the specific document

    try {
        await updateDoc(subjectDocRef, updatedSubjectData);
        return { status: true, message: "Document successfully updated" };
    } catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};


export const deleteSubject = async (subjectId) => {
    const subjectsRef = collection(db, "AddSubjects");
    const subjectDocRef = doc(subjectsRef, subjectId);

    try {
        await deleteDoc(subjectDocRef);
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getSubjectDataFromDb = async (DocId) => {
    try {
      const subjectDocRef = doc(db, "AddSubjects", DocId);
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

  