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

export const testStaffData = {
    name: "John Doe",
    role: "Teacher",
    staffId: "S001",
    mobileNo: "1234567890",
    salary: 50000,
    bloodGroup: "A+",
    bankAccount: "12345678901234",
  };

export const addNonTeachingStaffToDb = async (StaffData) => {
  const StaffRef = collection(db, "AddNonTeachingStaff");

  try {
    const StaffDoc = await addDoc(StaffRef, {
      name: StaffData.name,
      role: StaffData.role,
      staffId: StaffData.staffId,
      mobile: StaffData.mobileNo,
      salary: StaffData.salary,
      bloodGroup: StaffData.bloodGroup,
      bankAccount: StaffData.bankAccount,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Staff data added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding Staff data",
    };
  }
};

export const updateStaffToDatabase = async (
  documentId,
  updatedStaffData
) => {
  const StaffDocRef = doc(db, "AddNonTeachingStaff", documentId);

  try {
    const StaffDocSnapshot = await getDoc(StaffDocRef);
    const existingData = StaffDocSnapshot.data();

    const StaffDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedStaffData);

    if (StaffDataChanged) {
      await updateDoc(StaffDocRef, updatedStaffData);
      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteStaffData = async (docId) => {
  const StaffRef = collection(db, "AddNonTeachingStaff");
  const StaffDocRef = doc(StaffRef, docId);

  try {
    await deleteDoc(StaffDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificStaffDataFromDb = async (docId) => {
  try {
    const StaffDocRef = doc(db, "AddNonTeachingStaff", docId);
    const StaffDocSnapshot = await getDoc(StaffDocRef);

    if (StaffDocSnapshot.exists()) {
      console.log(StaffDocSnapshot.data());
      return StaffDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Staff data ", error);
    throw error;
  }
};
export const getStaffDataFromDatabase = async () => {
  const StaffRef = collection(db, "AddNonTeachingStaff");

  try {
    const q = query(StaffRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const StaffData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const applicableClassesString = data.applicableClasses.join(", ");

      const modifiedStaffData = {
        id: doc.id,
        name: data.name,
        role: data.role,
        staffId: data.staffId,
        mobile: data.mobileNo,
        salary: data.salary,
        bloodGroup: data.bloodGroup,
        bankAccount: data.bankAccount,
      };

      StaffData.push(modifiedStaffData);
    }

    return StaffData;
  } catch (error) {
    console.error(error);
  }
};
