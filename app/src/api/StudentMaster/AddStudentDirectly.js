import { db } from "../../config/firebase";
import { getDocs,addDoc,doc,updateDoc,deleteDoc,collection,getDoc,serverTimestamp,query,orderBy,setDoc, } from "firebase/firestore";

/**
 * Add a teacher to the database with subcollections.
 * @param {Object} teacherData - An object containing teacher data.
 * @param {string} teacherData.teacherId - The unique identifier for the teacher.
 * @param {string} teacherData.designation - The designation of the teacher.
 * @param {string} teacherData.emailId - The emailId of the teacher.
 * @param {string} teacherData.firstName - The first name of the teacher.
 * @param {string} teacherData.lastName - The last name of the teacher.
 * @param {number} teacherData.mobileNo - The mobile number of the teacher.
 * @param {array} teacherData.classTeacher - An array of class names associated with the teacher.
 * @param {string} teacherData.transportSlab - The transport slab information.
 * @param {map} teacherData.personalDetailsData - The transport slab information.
 * @param {map} teacherData.salaryDetailsData - The transport slab information.
 * @param {map} teacherData.addressDetailsData - The transport slab information.
 * @param {map} teacherData.experienceDetailsData - The transport slab information.

 */

export const studentDatatest = {
    studentId: "th102", // Updated teacher ID
    firstName: "Amar", // Updated first name
    lastName: "kumar", // Updated last name
    mobileNo: 9876543210, // Updated mobile number
    transportSlab: "bus", // Updated transport slab
    admissionDate:new Date(2008,8,7),
    joiningClass:"6A",
    feeslab:"78000",

    personalDetailsData: {
        gender: "female", // Updated gender
        cast: "New Cast", // Updated cast
        fatherName: "John Sr.", // Updated father's name
        motherName: "Mary", // Updated mother's name
        aadharNo:123456780912,
        bloodGroup: "B-", // Updated blood group
        guardianName:"father",
        guardianNo:8292772484,
        telephoneNo:9876543567,
        dob: new Date(1990, 5, 15), // Updated date of birth
        isSinglegirlchild:false,
        emailId:"student12@gmail.com"
    },

    addressDetailsData: {
        homeAddress: "456 Elm Street", // Updated address
        city: "Another City", // Updated city
        zipCode: "54321", // Updated ZIP code
        state: "Another State", // Updated state
        fatherMobileNo: "9876123456", // Updated home telephone number
    },

    takeAdmissionfees: {
        admissonFeeStatus:false,
        makeOfPayment: 1000,
        payableAmount: 10000,
        modeOfPayment:"cash",
        chequeNo:"IDIBchhh727638792t",
        upitransactionNo:"92673r7797t38798tguyt76",
        otherUniqeNo:"other873678576ew"
       
    },

    experienceDetailsData: {
        completionYear: "2019", // Updated completion year
        joiningDate: new Date(2017, 2, 10), // Updated joining date
        serviceInYears: 4, // Updated years of service
        confirmationDate: new Date(2017, 6, 20), // Updated confirmation date
        experienceSummary: "New job experience summary", // Updated experience summary
        oldPFNo: "987654", // Updated old PF number
        previousJob: "New Job Title", // Updated previous job title
        dateOfLeaving: new Date(2019, 10, 15), // Updated date of leaving
        dateOfConfirmation: new Date(2017, 8, 1), // Updated date of confirmation
        lastJobSalary: 60000, // Updated last job salary
        reasonForLeaving: "Personal reasons", // Updated reason for leaving
    },
};

export const addTeacherToDatabase = async (teacherData) => {

    const teacherRef = collection(db, "AddTeachers");
    try {
        const teacherDoc = await addDoc(teacherRef, {
            teacherId: teacherData.teacherId,
            designation: teacherData.designation,
            emailId: teacherData.emailId,
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
            mobileNo: teacherData.mobileNo,
            classTeacher: teacherData.classTeacher,
            transportSlab: teacherData.transportSlab,
            personalDetails: teacherData?.personalDetailsData,
            addressDetails:teacherData?.addressDetailsData,
            salaryDetails: teacherData?.salaryDetailsData,
            experienceDetails: teacherData?.experienceDetailsData,
            createdAt: serverTimestamp(),
        });

        console.log("data added succfully");
        return {
            status: true,
            message: "Teacher and subcollections added successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "Error adding teacher and subcollections",
        };
    }
};

export const getTeacherFromDatabase = async () => {
    const teacherRef = collection(db, "AddTeachers");

    try {
        const q = query(teacherRef, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);

        const teacherData = [];

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            if (data.classTeacher) {
                data.classTeacher = data.classTeacher.join(", "); // Join the array with a comma and space
            }

            const modifiedTeacherData = {
                id: doc.id,
                Name: data.firstName + " " + data.lastName,
                "Mobile No": data.mobileNo,
                Email: data.emailId,
                Salary: data.salaryDetails?.salaryAmount,
                "Class Teacher": data.classTeacher || [],
                "Classes Assigned": ["4A, ", "6B, ", "5C"],
                "Employee Id": data.teacherId,
                
            };

            teacherData.push(modifiedTeacherData);
        });

        return teacherData;
    } catch (error) {
        console.error(error);
    }
};

export const updateTeacherInDatabase = async (documentId, updatedTeacherData) => {

    const teacherDocRef = doc(db, "AddTeachers", documentId);

    try {
        const teacherDocSnapshot = await getDoc(teacherDocRef);
        const existingData = teacherDocSnapshot.data();
        
        const teacherDataChanged = JSON.stringify(existingData) !== JSON.stringify(updatedTeacherData);
        console.log("frontend data",updatedTeacherData);
        console.log("backend data",existingData);
        console.log("checking for changes", teacherDataChanged);
        

        if (teacherDataChanged) {
            await updateDoc(teacherDocRef, updatedTeacherData);   
        }
    }
    catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};

export const deleteTeacher = async (teacheId) => {
    const teachersRef = collection(db, "AddTeachers");
    const teacherDocRef = doc(teachersRef, teacheId);

    try {
        await deleteDoc(teacherDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getTeacherDataFromDd = async (DocId) => {
    try {
      const teacherDocRef = doc(db, "AddTeachers", DocId);
      const teacherDocSnapshot = await getDoc(teacherDocRef);

      if (teacherDocSnapshot.exists()) {
        console.log(teacherDocSnapshot.data())
        return teacherDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };
