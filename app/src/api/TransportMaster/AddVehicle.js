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

export const testvehicleData = {
  vehicleName: "School bus",
  vehicleRegistrationNumber: "KAZZ111",
  vehicleId: 11,
  stops: ["MG road", "St. John"],
};

export const addVehicleDataToDb = async (vehicleData) => {
  const vehicleRef = collection(db, "AddVehicle");
  try {
    const vehicleDoc = await addDoc(vehicleRef, {
      vehicleName: vehicleData.vehicleName,
      vehicleRegistrationNumber: vehicleData.vehicleRegistrationNumber,
      vehicleId: vehicleData.vehicleId,
      stops: vehicleData.stops,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Vehicle data added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding Vehicle data ",
    };
  }
};

export const updateVehicleDataToDatabase = async (
  documentId,
  updatedvehicleData
) => {
  const vehicleDocRef = doc(db, "AddVehicle", documentId);

  try {
    const vehicleDocSnapshot = await getDoc(vehicleDocRef);
    const existingData = vehicleDocSnapshot.data();

    const vehicleDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedvehicleData);

    if (vehicleDataChanged) {
      await updateDoc(vehicleDocRef, updatedvehicleData);
      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteVehicleData = async (docId) => {
  const vehicleRef = collection(db, "AddVehicle");
  const vehicleDocRef = doc(vehicleRef, docId);

  try {
    await deleteDoc(vehicleDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificVehicleDataFromDb = async (DocId) => {
  try {
    const vehicleDocRef = doc(db, "AddVehicle", DocId);
    const vehicleDocSnapshot = await getDoc(vehicleDocRef);

    if (vehicleDocSnapshot.exists()) {
      console.log(vehicleDocSnapshot.data());
      return vehicleDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Vehicle data ", error);
    throw error;
  }
};

export const getVehicleDataFromDatabase = async () => {
  const vehicleRef = collection(db, "AddVehicle");

  try {
    const q = query(vehicleRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const vehicleData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const stopsString = data.stops.join(", ");

      const modifiedvehicleData = {
        id: doc.id,
        vehicleName: data.vehicleName,
        vehicleRegistrationNumber: data.vehicleRegistrationNumber,
        vehicleId: data.vehicleId,
        stops: stopsString,
      };

      vehicleData.push(modifiedvehicleData);
    }

    return vehicleData;
  } catch (error) {
    console.error(error);
  }
};

export const getAllVehiclesName = async () => {
  const vehicleRef = collection(db, "AddVehicle");
  try {
      const querySnapshot = await getDocs(vehicleRef);

      const vhicleData = [];

      querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          vhicleData.push(data.vehicleName);
      });

      return vhicleData; 
  } catch (error) {
      console.error(error);
  }
};