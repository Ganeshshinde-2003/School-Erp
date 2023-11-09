import { db } from "../../config/firebase";
import { getDocs,addDoc,doc,updateDoc,deleteDoc,collection,getDoc,serverTimestamp,query,orderBy,setDoc, } from "firebase/firestore";



export const testStudentData = {
    applicationNo: '123456',
    firstName: 'John',
    lastName: 'Doe',
    mobileNo: '9876543210',
    joiningClass: '10th',
    dob: '2000-01-01', // Assuming date format is YYYY-MM-DD
    previousschoolTCNo: '7890123456',
    applicationFees: 100, // Assuming currency in your context
    paymentmode: 'online',
    upitransactionNo: 'ABC123XYZ',
    aadharNo: '123456789012',
  };


export const addStudentByApplicationToDatabase = async (studentData) => {
    const studentRef = collection(db, 'AddStudentByApplication');
    try {
        const studentDoc = await addDoc(studentRef, {
            applicationNo: studentData.applicationNo,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            mobileNo: studentData.mobileNo,
            joiningClass: studentData.joiningClass,
            dob: studentData.dob,
            previousschoolTCNo:studentData.previousschoolTCNo,
            applicationFees: studentData.applicationFees,
            paymentmode: studentData.paymentmode,
            upitransactionNo: studentData.upitransactionNo,
            aadharNo:studentData.aadharNo,
            isPending: true,
            createdAt: serverTimestamp(),
        });

        console.log('Data added successfully');
        return {
            status: true,
            message: 'Student and subcollections added successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: 'Error adding student and subcollections',
        };
    }
};

export const updateStudentByApplicationToDatabase = async (documentId, updatedStudentData) => {

    const studentDocRef = doc(db, "AddStudentByApplication", documentId);

    try {
        const studentDocSnapshot = await getDoc(studentDocRef);
        const existingData = studentDocSnapshot.data();
        
        const studentDataChanged = JSON.stringify(existingData) !== JSON.stringify(updatedStudentData);
        
        if (studentDataChanged) {
            await updateDoc(studentDocRef, updatedStudentData);  
            return { status: true, message: "Document successfully updated" }; 
        }
    }
    catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};

export const deleteStudent = async (docId) => {
    const studentRef = collection(db, "AddStudentByApplication");
    const studentDocRef = doc(studentRef, docId);

    try {
        await deleteDoc(studentDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getStudentDataFromDd = async (DocId) => {
    try {
      const studentDocRef = doc(db, "AddStudentByApplication", DocId);
      const studentDocSnapshot = await getDoc(studentDocRef);

      if (studentDocSnapshot.exists()) {
        console.log(studentDocSnapshot.data())
        return studentDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };

  export const getApplicantStudentFromDatabase = async () => {
    const studentRef = collection(db, "AddStudentByApplication");

    try {
        const q = query(studentRef, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);

        const studentData = [];

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
      
            // Modify the student data as needed
            const modifiedStudentData = {
              id: doc.id,
              Name: data.firstName + " " + data.lastName,
              mobileNo: data.mobileNo,
              applicationNo: data.applicationNo,
              joiningClass: data.joiningClass,
              paymentmode: data.paymentmode,
              upitransactionNo: data.upitransactionNo,
              isPending: data.isPending,
            };
      
            studentData.push(modifiedStudentData);
          }

        return studentData;
    } catch (error) {
        console.error(error);
    }
};
