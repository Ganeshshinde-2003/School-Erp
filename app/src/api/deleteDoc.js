import { db } from "../config/firebase";
import { doc, collection,deleteDoc } from "firebase/firestore";

const deleteDocument = async (collectionName,id) => {

    // const DocumentRef = collection(db, collectionName);
    const documentRef = doc(db,collectionName, id);

    try {
        await deleteDoc(documentRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};


export default deleteDocument;