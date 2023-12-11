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

const timetableDatafortesting = {
  className: "2B",
  subject: "Sports",
  startTime: "8:00",
  endTime: "9:00",
  day: "Wednesday",
};

export const getTimetableTable = async () => {
  const classAndSectionsRef = collection(db, "AddClassAndSections");

  try {
    const querySnapshot = await getDocs(classAndSectionsRef);
    
    const timetableData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const className = data.className;
      const nameOfSections = data.nameOfSections;

      const formattedSections = nameOfSections.join(" ");

      const timetableItem = {
        id: doc.id,
        Class: className,
        Section: formattedSections,
      };

      timetableData.push(timetableItem);
    });

    console.log("timetableData", timetableData);
    return timetableData;
  } catch (error) {
    console.error(error);
    // Handle the error as needed
  }
};

export const addTimetable = async (data) => {
  const { className, subject, startTime, endTime, day } = data;
  const timetableRef = doc(db, "Timetable", className);

  try {
    // Get the current timetable data for the class
    const classDocSnapshot = await getDoc(timetableRef);
    const classData = classDocSnapshot.data() || {};

    // Get the current timetable data for the specified day
    const dayData = classData[day] || {};

    // Update the day data with the new timetable entry
    dayData[startTime] = {
      startTime,
      endTime,
      subject,
    };

    // Update the class document with the modified timetable data
    await setDoc(timetableRef, {
      ...classData,
      [day]: dayData,
    });

    console.log("Timetable entry added successfully");
    return {
      status: true,
      message: "Timetable entry added successfully",
    };
  } catch (error) {
    console.error("Error adding timetable entry:", error);
    return {
      status: false,
      message: "Error adding timetable entry",
    };
  }
};

export const getTimetableData = async (className) => {
  const timetableRef = doc(db, "Timetable", className);

  try {
    const classDocSnapshot = await getDoc(timetableRef);

    if (classDocSnapshot.exists()) {
      return {
        timetableData: classDocSnapshot.data(),
      };
    } else {
      return {
        timetableData: null,
      };
    }
  } catch (error) {
    console.error("Error retrieving timetable data:", error);
    return {
      timetableData: null,
    };
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
