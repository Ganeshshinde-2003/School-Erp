import {
    collection,
    query,
    orderBy,
    getDocs,
  } from "firebase/firestore";
  import { db } from "../../config/firebase";
import { calculateAttendancePercentage, calculateNumberOfAbsentDays } from "../StaffAttendance/StaffAttendance";
  
  export const getNonTeachingStaffSalaryDataFromDatabase = async (month) => {
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
        const options = {
          staffId: staffId,
          month: month, // Replace with the desired month
          overall: false,
        };

        const absentDays = await calculateNumberOfAbsentDays(options);
        console.log(absentDays);
        const attendancePercentage = await calculateAttendancePercentage(options) / 100;
        const totalAmount = staffSalary * attendancePercentage ;
  
        const modifiedData = {
          id: doc.id,
          "Staff Name":staffName,
          "Staff Id":staffId,
          "Staff Salary":staffSalary,
          "Absent days":absentDays,
          "Total Amount":totalAmount.toFixed(2),
        };
  
        nonTeachingStaffSalaryData.push(modifiedData);
      }
  
      return nonTeachingStaffSalaryData;
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  