import { db } from "../../config/firebase";
import { getDocs,addDoc,doc,updateDoc,deleteDoc,collection,getDoc,serverTimestamp,query,orderBy,setDoc, } from "firebase/firestore";



export const testtransportData = {
    stopName: "Harohalli",
    stopId: 12,
    stopFees: 45000,
  };


export const addTransportDataToDb = async (transportData) => {
    const transportRef = collection(db, 'AddStopAndFees');
    try {
        const transportDoc = await addDoc(transportRef, {
            stopName: transportData.stopName,
            stopId: transportData.stopId,
            stopFees: transportData.stopFees,
            createdAt: serverTimestamp(),
        });

        console.log('Data added successfully');
        return {
            status: true,
            message: 'Transport data added successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: 'Error adding Transport data',
        };
    }
};

export const updateTransportDataToDatabase = async (documentId, updatedtransportData) => {

    const transportDocRef = doc(db, "AddStopAndFees", documentId);

    try {
        const transportDocSnapshot = await getDoc(transportDocRef);
        const existingData = transportDocSnapshot.data();
        
        const transportDataChanged = JSON.stringify(existingData) !== JSON.stringify(updatedtransportData);
        
        if (transportDataChanged) {
            await updateDoc(transportDocRef, updatedtransportData);
            console.log('Data updated successfully');
            return { status: true, message: "Document successfully updated" }; 
        }
    }
    catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};

export const deleteTransportData = async (docId) => {
    const transportRef = collection(db, "AddStopAndFees");
    const transportDocRef = doc(transportRef, docId);

    try {
        await deleteDoc(transportDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getSpecificTransportDataFromDb = async (DocId) => {
    try {
      const transportDocRef = doc(db, "AddStopAndFees", DocId);
      const transportDocSnapshot = await getDoc(transportDocRef);

      if (transportDocSnapshot.exists()) {
        console.log(transportDocSnapshot.data())
        return transportDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching Transport data", error);
      throw error;
    }
  };

  export const getTransportDataFromDatabase = async () => {
    const transportRef = collection(db, "AddStopAndFees");

    try {
        const q = query(transportRef, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);

        const transportData = [];

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
      
            // Modify the transport data as needed
            const modifiedtransportData = {
              id: doc.id,
              "Stop Name": data.stopName,
              "Stop Fees": data.stopFees,
              "Stop Id": data.stopId,
            };
      
            transportData.push(modifiedtransportData);
          }

        return transportData;
    } catch (error) {
        console.error(error);
    }
};

export const getAllTransportSlabs = async () => {
    const transportSlabRef = collection(db, "AddStopAndFees");
    try {
        const querySnapshot = await getDocs(transportSlabRef);

        const transportSlabsData = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            transportSlabsData.push(data.stopName);
        });

        return transportSlabsData; 
    } catch (error) {
        console.error(error);
    }
};
