import { db } from "../../config/firebase";
import { doc,getDocs,addDoc, collection,updateDoc,deleteDoc,getDoc, where, query, orderBy, serverTimestamp } from "firebase/firestore";

/**
 * Add a subject to the database.
 * @param {Object} HolidayData - An object containing subject data.
 * @param {string} HolidayData.subjectTotalMarks - The maximun marks which the subject belongs.
 * @param {string} HolidayData.subjectName - The name of the subject.
 * @param {string} HolidayData.subjectCode - The unique identifier for the subject.
 */

export const AddHolidayAndEventsToDb = async (HolidayData) => {
    const HolidayRef = collection(db, "AddHolidayAndEvents");
    
    try {
        await addDoc(HolidayRef, {
            eventName: HolidayData.eventName,
            isHoliday:HolidayData.isHoliday,
            startDate: HolidayData.startDate,
            endDate: HolidayData.endDate,
            createdAt: serverTimestamp(),

        });
        return { status: true, message: "Document successfully added" };
    } catch (error) {
        console.error(error);
        return { status: false, message: "Error adding document" };
    }
};



export const getHolidayAndEventsData = async () => {
    const HolidayRef = collection(db, "AddHolidayAndEvents");
    try {
        const q = query(HolidayRef, orderBy("createdAt", "asc")); // Add the orderBy query here

        const querySnapshot = await getDocs(q);
        
        const HolidayData = [];
        
        querySnapshot.forEach(async (doc) => {
          
            const data = doc.data();

            // Convert timestamp to Date objects
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);

            // Format dates as DD/MM/YYYY (adjust as needed)
            const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
            const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

            const modifiedData = {
                "id": doc.id,                
                "Name": data.eventName,
                "Duration": `${formattedStartDate} - ${formattedEndDate}`,
                "Holiday": data.isHoliday,
            };
            HolidayData.push(modifiedData);

        });     

        return HolidayData; // Return the HolidayData
    } catch (error) {
        console.error(error);
    }
};

export const deleteHoliday = async (subjectId) => {
    const HolidayRef = collection(db, "AddHolidayAndEvents");
    const subjectDocRef = doc(HolidayRef, subjectId);

    try {
        await deleteDoc(subjectDocRef);
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};



  