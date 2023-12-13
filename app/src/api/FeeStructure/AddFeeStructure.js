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
} from "firebase/firestore";

export const feeStructureTestDay = {
  className: "2",
  applicationFee: "5000",
  sports:{
    examfee: "1000",
    practicalFee: "500",
    waterFee: "100",
  },
    normal:{
        examfee: "100",
        practicalFee: "50",
        
    },

};



export const getFeeStructureDataTable = async () => {
    const classAndSectionsRef = collection(db, "AddClassAndSections");
  
    try {
      const querySnapshot = await getDocs(classAndSectionsRef);
      
      const feeStructureArray = [];
  
      for (const document of querySnapshot.docs) {
        const data = document.data();
        const className = data.className;
  
        // Fetch applicationFee from AddFeeStructure based on className as docID
        const feeStructureRef = doc(db, "AddFeeStructure", className);
        const feeStructureDocSnapshot = await getDoc(feeStructureRef);
  
        const applicationFee = feeStructureDocSnapshot.exists()
          ? feeStructureDocSnapshot.data().applicationFee || "N/A"
          : "N/A";
  
        const feeStructureItem = {
          id: className,
          Class: className,
          applicationFee,
        };
  
        feeStructureArray.push(feeStructureItem);
      }
  
      // Sort feeStructureArray based on className in ascending order
      feeStructureArray.sort((a, b) => a.Class.localeCompare(b.Class));
  
      console.log("feeStructureArray", feeStructureArray);
      return feeStructureArray;
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

export const addFeeStructure = async (data) => {
    const { className, ...slabs } = data;
    const feeStructureRef = doc(db, "AddFeeStructure", className);
  
    try {
      // Set the fee structure data for the specified class
      await setDoc(feeStructureRef, {
        ...slabs,
        createdAt: serverTimestamp(),
      }, { merge: true });
  
      console.log("Fee structure added successfully");
      return {
        status: true,
        message: "Fee structure added successfully",
      };
    } catch (error) {
      console.error("Error adding fee structure:", error);
      return {
        status: false,
        message: "Error adding fee structure",
      };
    }
  };

  export const updateFeeStructure = async (data) => {
    const { className, ...slabs } = data;
    const feeStructureRef = doc(db, "AddFeeStructure", className);
  
    try {
      // Update the fee structure data for the specified class
      await updateDoc(feeStructureRef, {
        ...slabs,
        updatedAt: serverTimestamp(),
      });
  
      console.log("Fee structure updated successfully");
      return {
        status: true,
        message: "Fee structure updated successfully",
      };
    } catch (error) {
      console.error("Error updating fee structure:", error);
      return {
        status: false,
        message: "Error updating fee structure",
      };
    }
  };


  export const getSpecificFeeStructure = async (className) => {
    const feeStructureRef = doc(db, "AddFeeStructure", className);
  
    try {
      const docSnapshot = await getDoc(feeStructureRef);
  
      if (docSnapshot.exists()) {
        const feeStructureData = {
          className: docSnapshot.id,
          ...docSnapshot.data(),
        };
        
        console.log("Fee structure data retrieved successfully:", feeStructureData);
        return feeStructureData;
      }
    } catch (error) {
      console.error("Error retrieving specific fee structure data:", error);
      return null;
    }
  };

export const getSpecificTimetableData = async (data) => {
  const { className, day, startTime } = data;
  const timetableRef = doc(db, "Timetable", className, day);

  try {
    const dayDocSnapshot = await getDoc(timetableRef);

    if (dayDocSnapshot.exists()) {
      const timetableData = dayDocSnapshot.data();

      // Find the specific timetable entry with the given start time
      const specificTimetableEntry = Object.entries(timetableData).find(
        ([subject, data]) => data.startTime === startTime
      );

      if (specificTimetableEntry) {
        const [subject, data] = specificTimetableEntry;
        return {
          status: true,
          message: "Timetable data retrieved successfully",
          specificTimetableData: {
            subject,
            startTime: data.startTime,
            endTime: data.endTime,
          },
        };
      } else {
        return {
          status: false,
          message: "Timetable entry not found for the given start time",
          specificTimetableData: null,
        };
      }
    } else {
      return {
        status: false,
        message: "Class timetable not found for the given day",
        specificTimetableData: null,
      };
    }
  } catch (error) {
    console.error("Error retrieving specific timetable data:", error);
    return {
      status: false,
      message: "Error retrieving specific timetable data",
      specificTimetableData: null,
    };
  }
};
