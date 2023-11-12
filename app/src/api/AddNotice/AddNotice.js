import { db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const addNoticeToDatabase = async (noticeData) => {
    const noticeRef = collection(db, "AddNotice");
    
    try {
        await addDoc(noticeRef, {
            noticeTo: noticeData.noticeto,
            noticeDescription: noticeData.noticeDescription,
            createdAt: serverTimestamp(),
        });
        return { status: true, message: "Document successfully added" };
    } catch (error) {
        console.error(error);
        return { status: false, message: "Error adding document" };
    }
};
