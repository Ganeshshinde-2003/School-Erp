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
  setDoc,
} from "firebase/firestore";

export const testdriverData = {
  driverName: "Harman Singh",
  driverVehicle: "C1",
  driverId: 1,
  mobileNo: 83545454393,
  driverSalary: 5000,
  bloodGroup: "C+",
  bankAccountNumber: 65665553338,
};

export const addDriverDataToDb = async (driverData) => {
  const driverRef = collection(db, "AddDriver");
  try {
    const driverDoc = await addDoc(driverRef, {
      firstName: driverData.firstName,
      lastName: driverData.lastName,
      driverVehicle: driverData.driverVehicle,
      driverId: driverData.driverId,
      mobileNo: driverData.mobileNo,
      driverSalary: driverData.driverSalary,
      bloodGroup: driverData.bloodGroup,
      dob: driverData.dob,
      bankAccountNumber: driverData.bankAccountNumber,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Driver data added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding Driver data ",
    };
  }
};

export const updateDriverDataToDatabase = async (
  documentId,
  updateddriverData
) => {
  const driverDocRef = doc(db, "AddDriver", documentId);

  try {
    const driverDocSnapshot = await getDoc(driverDocRef);
    const existingData = driverDocSnapshot.data();

    const driverDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updateddriverData);

    if (driverDataChanged) {
      await updateDoc(driverDocRef, updateddriverData);
      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteDriverData = async (docId) => {
  const driverRef = collection(db, "AddDriver");
  const driverDocRef = doc(driverRef, docId);

  try {
    await deleteDoc(driverDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificDriverDataFromDb = async (DocId) => {
  try {
    const driverDocRef = doc(db, "AddDriver", DocId);
    const driverDocSnapshot = await getDoc(driverDocRef);

    if (driverDocSnapshot.exists()) {
      console.log(driverDocSnapshot.data());
      return driverDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Driver data ", error);
    throw error;
  }
};

export const getDriverDataFromDatabase = async () => {
  const driverRef = collection(db, "AddDriver");

  try {
    const q = query(driverRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const driverData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const modifiedDriverData = {
        id: doc.id,
        "Driver Name": data.firstName + " " + data.lastName,
        "Driver Vehicle": data.driverVehicle,
        "Driver Id": data.driverId,
        "Mobile no.": data.mobileNo,
        "Driver salary": data.driverSalary,
        "Blood group": data.bloodGroup,
        "Bank account no.": data.bankAccountNumber,
      };

      driverData.push(modifiedDriverData);
    }

    return driverData;
  } catch (error) {
    console.error(error);
  }
};
