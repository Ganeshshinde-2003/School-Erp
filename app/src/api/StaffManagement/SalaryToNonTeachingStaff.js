import {
    collection,
    query,
    orderBy,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../../config/firebase";
  
  export const getNonTeachingStaffSalaryDataFromDatabase = async () => {
    const nonTeachingStaffRef = collection(db, "AddNonTeachingStaff");
  
    try {
      const q = query(nonTeachingStaffRef, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
  
      const nonTeachingStaffSalaryData = [];
  
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
  
        // Combine firstName and lastName to create Staff name
        const staffName = `${data.firstName} ${data.lastName}`;
  
        // Use staffId as Staff Salary
        const staffSalary = data.salary;
        const staffId = data.staffId;
  
        // Dummy values for absentDays and totalAmount
        const absentDays = 2;
        const totalAmount = 10000;
  
        const modifiedData = {
          id: doc.id,
          "Staff Name":staffName,
          "Staff Id":staffId,
          "Staff Salary":staffSalary,
          "Absent days":absentDays,
          "Total Amount":totalAmount,
        };
  
        nonTeachingStaffSalaryData.push(modifiedData);
      }
  
      return nonTeachingStaffSalaryData;
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  