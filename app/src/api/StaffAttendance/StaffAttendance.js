import { db } from "../../config/firebase";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  arrayUnion
} from "firebase/firestore";

const testDataAttendance = {
    staffArray: [
      { staffid: "gasfaf", isPresent: true },
      { staffid: "123456789", isPresent: false },
      { staffid: "ganesh2003", isPresent: true },
      { staffid: "st29876", isPresent: true },
      { staffid: "ENG21CS0135", isPresent: false },
      { staffid: "fdsaaf", isPresent: true },
      { staffid: "rwe45", isPresent: false },

      // Add more staff objects as needed
    ],
    date: "2023-06-04", // Format: YYYY-MM-DD
  };


    const options1 = {
      staffId: "009",
      overall: true,
    };

    const options = {
        staffId: "st001",
        month: "Jun", // Replace with the desired month
        overall: false,
      };

    //   const date = "2023-10-08"; // Replace with the desired date
    //   const attendanceList = await getAttendanceList(date);

export const storeStaffAttendance = async (attendanceData) => {
  try {
    // Extract month from the provided attendance date
    const month = new Date(attendanceData.date).toLocaleString("default", { month: "short" });

    // Loop through the staffArray and store attendance for each staff
    for (const staffObj of attendanceData.staffArray) {
      const staffId = staffObj.staffid;

      // Reference to the staff's attendance document
      const staffAttendanceRef = doc(db, "StaffAttendance", staffId);

      // Check if the staff's attendance document exists
      if ((await getDoc(staffAttendanceRef)).exists()) {
        // If the document exists, update the attendance data for the specified month
        await updateDoc(staffAttendanceRef, {
          [month]: arrayUnion({
            date: attendanceData.date, // Use the specific date from the frontend
            isPresent: staffObj.isPresent,
          }),
        });
      } else {
        // If the document doesn't exist, create a new one with the given attendance data
        await setDoc(staffAttendanceRef, {
          [month]: [
            {
              date: attendanceData.date, // Use the specific date from the frontend
              isPresent: staffObj.isPresent,
            },
          ],
        });
      }
    }

    console.log("Staff attendance data stored successfully");
    return {
      status: true,
      message: "Staff attendance data stored successfully",
    };
  } catch (error) {
    console.error("Error storing staff attendance data:", error);
    return {
      status: false,
      message: "Error storing staff attendance data",
    };
  }
};

export const calculateAttendancePercentage = async (options) => {
    try {
      const { staffId, month, overall } = options;
  
      if (!staffId) {
        return {
          status: false,
          message: "StaffId is required",
        };
      }
  
      const staffAttendanceRef = doc(db, "StaffAttendance", staffId);
      const staffAttendanceDoc = await getDoc(staffAttendanceRef);
  
      if (!staffAttendanceDoc.exists()) {
        return {
          status: false,
          message: "Staff attendance data not found",
        };
      }
  
      const attendanceData = staffAttendanceDoc.data();
  
      if (overall) {
        // Calculate overall attendance percentage
        let totalPresent = 0;
        let totalDays = 0;
  
        for (const month in attendanceData) {
          attendanceData[month].forEach((entry) => {
            totalDays++;
            if (entry.isPresent) {
              totalPresent++;
            }
          });
        }
  
        const overallPercentage = (totalPresent / totalDays) * 100;
  
        return overallPercentage.toFixed(2);
      } else if (month && attendanceData[month]) {
        // Calculate attendance percentage for a specific month
        const monthData = attendanceData[month];
        const totalDays = monthData.length;
        let totalPresent = 0;
  
        monthData.forEach((entry) => {
          if (entry.isPresent) {
            totalPresent++;
          }
        });
  
        const monthPercentage = (totalPresent / totalDays) * 100;
  
        return monthPercentage.toFixed(2);
      } else {
        return 0 ;
      }
    } catch (error) {
      console.error("Error calculating attendance percentage:", error);
      return 0 ;
    }
  };

  export const calculateNumberOfAbsentDays = async (options) => {
    try {
      const { staffId, month, overall } = options;
  
      if (!staffId) {
        return {
          status: false,
          message: "StaffId is required",
        };
      }
  
      const staffAttendanceRef = doc(db, "StaffAttendance", staffId);
      const staffAttendanceDoc = await getDoc(staffAttendanceRef);
  
      if (!staffAttendanceDoc.exists()) {
        return {
          status: false,
          message: "Staff attendance data not found",
        };
      }
  
      const attendanceData = staffAttendanceDoc.data();
  
      if (overall) {
        // Calculate overall attendance percentage
        let totalPresent = 0;
        let totalDays = 0;
  
        for (const month in attendanceData) {
          attendanceData[month].forEach((entry) => {
            totalDays++;
            if (entry.isPresent) {
              totalPresent++;
            }
          });
        }
  
        const overallDays = totalDays - totalPresent;
        return overallDays;
      } else if (month && attendanceData[month]) {
        // Calculate attendance percentage for a specific month
        const monthData = attendanceData[month];
        const totalDays = monthData.length;
        let totalPresent = 0;
  
        monthData.forEach((entry) => {
          if (entry.isPresent) {
            totalPresent++;
          }
        });
  
        const monthDays = totalDays - totalPresent;
  
        return monthDays;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error calculating attendance percentage:", error);
      return 0;
    }
  };

  export const getAttendanceList = async (date) => {
    try {
      const attendanceList = [];
  
      // Fetch teacher data
      const teachersRef = collection(db, "AddTeachers");
      const teachersQuery = query(teachersRef);
  
      const teachersSnapshot = await getDocs(teachersQuery);
  
      for (const teacherDoc of teachersSnapshot.docs) {
        const teacherData = teacherDoc.data();
        const teacherId = teacherData.teacherId;
        const teacherName = `${teacherData.firstName} ${teacherData.lastName}`;
  
        const isPresent = await getAttendanceStatus(teacherId, date);
  
        attendanceList.push({
          name: teacherName,
          id: teacherId,
          isteacher: true,
          isnonTeacher: false,
          isPresent,
        });
      }
  
      // Fetch non-teaching staff data
      const nonTeachingStaffRef = collection(db, "AddNonTeachingStaff");
      const nonTeachingStaffQuery = query(nonTeachingStaffRef);
  
      const nonTeachingStaffSnapshot = await getDocs(nonTeachingStaffQuery);
  
      for (const staffDoc of nonTeachingStaffSnapshot.docs) {
        const staffData = staffDoc.data();
        const staffId = staffData.staffId;
        const staffName = `${staffData.firstName} ${staffData.lastName}`;
  
        const isPresent = await getAttendanceStatus(staffId, date);
  
        attendanceList.push({
          name: staffName,
          id: staffId,
          isteacher: false,
          isnonTeacher: true,
          isPresent,
        });
      }
  
      return attendanceList;
    } catch (error) {
      console.error("Error fetching attendance list:", error);
      return [];
    }
  };
  
  const getAttendanceStatus = async (staffId, date) => {
    try {
      const staffAttendanceRef = doc(db, "StaffAttendance", staffId);
      const staffAttendanceDoc = await getDoc(staffAttendanceRef);
  
      if (staffAttendanceDoc.exists()) {
        const dateObject = new Date(date);
        const monthAbbreviation = dateObject.toLocaleString('default', { month: 'short' });
        const monthData = staffAttendanceDoc.data()[monthAbbreviation];
        for(let i = 0; i < monthData.length; i++) {
            if(monthData[i].date == date) {
                return monthData[i].isPresent;
            }
        }
        return false;
      }

  
    } catch (error) {
      console.error("Error fetching attendance status:", error);
      return false;
    }
  };
  
  
  

