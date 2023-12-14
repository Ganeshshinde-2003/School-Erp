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
  where,
} from "firebase/firestore";

export const getSpecificDriverDataFromDb = async (DocId) => {
    try {
      const driverDocRef = doc(db, "AddDriver", DocId);
      const driverDocSnapshot = await getDoc(driverDocRef);

      if (driverDocSnapshot.exists()) {
        console.log(driverDocSnapshot.data())
        return driverDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching Driver data ", error);
      throw error;
    }
  };

export const getLocateDataFromDatabase = async () => {
  const driverRef = collection(db, "AddDriver");

  try {
    const q = query(driverRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const driverData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      // Retrieve driver data
      const stopData = [];
      const modifiedDriverData = {
        id: doc.id,
        "Driver Name": data.firstName + " " + data.lastName,
        "Driver Vehicle": data.driverVehicle,
        "Driver Id": data.driverId,
        "Mobile no.": data.mobileNo,
        Stops: [],  // Assuming you want to store stops here
        Locate: "",  // You may need to update this based on your requirements
      };

      // Match with vehicle data based on driverVehicle
      const vehicleName = data.driverVehicle;
      const vehicleRef = collection(db, "AddVehicle");
      const vehicleQuery = query(
        vehicleRef,
        where("vehicleName", "==", vehicleName)
      );
      const vehicleSnapshot = await getDocs(vehicleQuery);

      if (!vehicleSnapshot.empty) {
        const vehicleData = vehicleSnapshot.docs[0].data();
        modifiedDriverData.Stops = vehicleData.stops;
      }

      driverData.push(modifiedDriverData);
    }

    console.log(driverData);
    return driverData;
  } catch (error) {
    console.error(error);
  }
};
