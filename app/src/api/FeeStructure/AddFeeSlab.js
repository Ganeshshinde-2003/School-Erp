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

export const testFeeSlabData = {
  slabName: "Topers",
  applicableClasses: ["1", "2", "3", "4", "5", "6", "7", "8"],
  slabId: "002",
  requirements: "Above 95% marks",
};

export const addFeeSlabToDb = async (feeSlabData) => {
  const feeSlabRef = collection(db, "AddFeeSlab");

  try {
    const feeSlabDoc = await addDoc(feeSlabRef, {
      slabName: feeSlabData.slabName,
      applicableClasses: feeSlabData.applicableClasses,
      slabId: feeSlabData.slabId,
      requirements: feeSlabData.requirements,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Fee slab data added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding fee slab data",
    };
  }
};

export const updateFeeSlabToDatabase = async (
  documentId,
  updatedFeeSlabData
) => {
  const feeSlabDocRef = doc(db, "AddFeeSlab", documentId);

  try {
    const feeSlabDocSnapshot = await getDoc(feeSlabDocRef);
    const existingData = feeSlabDocSnapshot.data();

    const feeSlabDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedFeeSlabData);

    if (feeSlabDataChanged) {
      await updateDoc(feeSlabDocRef, updatedFeeSlabData);
      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteFeeSlabData = async (docId) => {
  const feeSlabRef = collection(db, "AddFeeSlab");
  const feeSlabDocRef = doc(feeSlabRef, docId);

  try {
    await deleteDoc(feeSlabDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificFeeSlabDataFromDb = async (docId) => {
  try {
    const feeSlabDocRef = doc(db, "AddFeeSlab", docId);
    const feeSlabDocSnapshot = await getDoc(feeSlabDocRef);

    if (feeSlabDocSnapshot.exists()) {
      console.log(feeSlabDocSnapshot.data());
      return feeSlabDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Fee Slab data ", error);
    throw error;
  }
};
export const getFeeSlabDataFromDatabase = async () => {
  const feeSlabRef = collection(db, "AddFeeSlab");

  try {
    const q = query(feeSlabRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const feeSlabData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const applicableClassesString = data.applicableClasses.join(", ");

      const modifiedFeeSlabData = {
        id: doc.id,
        "Slab Name": data.slabName,
        "Applicable Classes": applicableClassesString,
        "Slab ID": data.slabId,
        "Requirements": data.requirements,
      };

      feeSlabData.push(modifiedFeeSlabData);
    }

    return feeSlabData;
  } catch (error) {
    console.error(error);
  }
};

export const getAllFeeSlab = async () => {
  const feeSlabRef = collection(db, "AddFeeSlab");
  try {
    const querySnapshot = await getDocs(feeSlabRef);

    const feeSlabData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      feeSlabData.push(data.slabName);
    });

    return feeSlabData;
  } catch (error) {
    console.error(error);
  }
};