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

export const teacherDatatest = {
    teacherId: "th102", // Updated teacher ID
    designation: "Subject Teacher", // Updated designation
    emailId: "testteacher@gmail.com", // Updated email
    firstName: "John", // Updated first name
    lastName: "Smith", // Updated last name
    mobileNo: 9876543210, // Updated mobile number
    classTeacher: ["Class C", "Class D"], // Updated class teacher assignments
    transportSlab: "bus", // Updated transport slab

    personalDetailsData: {
        dob: new Date(1990, 5, 15), // Updated date of birth
        fatherName: "John Sr.", // Updated father's name
        motherName: "Mary", // Updated mother's name
        spouseName: "Jane", // Updated spouse's name
        sex: "female", // Updated gender
        cast: "New Cast", // Updated cast
        castCategory: "OBC", // Updated cast category
        bloodGroup: "B-", // Updated blood group
    },

    addressDetailsData: {
        address: "456 Elm Street", // Updated address
        city: "Another City", // Updated city
        zipCode: "54321", // Updated ZIP code
        state: "Another State", // Updated state
        homeTelephoneNo: "9876123456", // Updated home telephone number
    },

    salaryDetailsData: {
        basic: "abcxyz", // Updated basic salary
        acNo: 9876543210, // Updated account number
        lic: "xyzabc", // Updated LIC policy
        loan: "7500", // Updated loan amount
        pfApplied: "def", // Updated PF applied status
        pfNo: 9876543210, // Updated PF number
        previousYearSalary: 135792, // Updated previous year salary
        salaryAmount: 250000, // Updated salary amount
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
            return { status: true, message: "Document successfully updated" };
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
