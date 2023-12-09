import { db } from "../../config/firebase";
import {
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";


export const getTeacherAndSalaryDataFromDatabase = async () => {
    const teachersRef = collection(db, "AddTeachers");
  
    try {
      const q = query(teachersRef, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
  
      const teacherAndSalaryData = [];
  
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
  
        // Combine firstName and lastName to create Staff name
        const staffName = `${data.firstName} ${data.lastName}`;
  
        // Use teacherId as Staff id
        const staffId = data.teacherId;
  
        // Extract salaryAmount from the salaryDetails map
        const salaryAmount = data.salaryDetails ? data.salaryDetails.salaryAmount : null;
  
        // Set default values for totalAmount and absentDays
        const totalAmount = 10000;
        const absentDays = 2;
  
        const modifiedData = {
          id: doc.id,
          "Staff Name":staffName,
          "Staff ID":staffId,
          "Staff Salary":salaryAmount,
          "Absent days":absentDays,
          "Total Amount":totalAmount,
        };
  
        teacherAndSalaryData.push(modifiedData);
      }
  
      return teacherAndSalaryData;
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  