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

export const testexpenseData = {
  expenseName: "Tube light",
  amount: 5000,
  description: "Fixed lights for basement floor all rooms",
};

export const addExpenseDataToDb = async (expenseData) => {
  const expenseRef = collection(db, "AddExpense");
  try {
    const expenseDoc = await addDoc(expenseRef, {
      expenseName: expenseData.expenseName,
      amount: expenseData.amount,
      description: expenseData.description,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Expense data added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding Expense data ",
    };
  }
};

export const updateExpenseDataToDatabase = async (
  documentId,
  updatedexpenseData
) => {
  const expenseDocRef = doc(db, "AddExpense", documentId);

  try {
    const expenseDocSnapshot = await getDoc(expenseDocRef);
    const existingData = expenseDocSnapshot.data();

    const expenseDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedexpenseData);

    if (expenseDataChanged) {
      await updateDoc(expenseDocRef, updatedexpenseData);
      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteExpenseData = async (docId) => {
  const expenseRef = collection(db, "AddExpense");
  const expenseDocRef = doc(expenseRef, docId);

  try {
    await deleteDoc(expenseDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificExpenseDataFromDb = async (DocId) => {
  try {
    const expenseDocRef = doc(db, "AddExpense", DocId);
    const expenseDocSnapshot = await getDoc(expenseDocRef);

    if (expenseDocSnapshot.exists()) {
      console.log(expenseDocSnapshot.data());
      return expenseDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Expense data ", error);
    throw error;
  }
};

export const getExpenseDataFromDatabase = async () => {
  const expenseRef = collection(db, "AddExpense");

  try {
    const q = query(expenseRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const expenseData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const modifiedexpenseData = {
        id: doc.id,
        "Expense Name": data.expenseName,
        Amount: data.amount,
        Description: data.description,
      };

      expenseData.push(modifiedexpenseData);
    }

    return expenseData;
  } catch (error) {
    console.error(error);
  }
};

export const getTotalExpense = async () => {
  const expenseData = await getExpenseDataFromDatabase();
  const totalExpense = expenseData.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  return totalExpense;
};
