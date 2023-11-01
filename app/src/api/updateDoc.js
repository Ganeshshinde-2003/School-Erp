import { db } from "../config/firebase";
import { doc, collection ,updateDoc} from "firebase/firestore";

const updateDocument = async (collectionName,documentId, updatedData) => {
    const subjectsRef = collection(db, collectionName);
    const subjectDocRef = doc(subjectsRef, documentId); // Use Id to reference the specific document

    try {
        await updateDoc(subjectDocRef, updatedData);
        console.log("Document successfully updated!");
        return { status: true, message: "Document successfully updated" };
    } catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};


export default updateDocument;