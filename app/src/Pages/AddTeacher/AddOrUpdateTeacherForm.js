import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import {
  addTeacherToDatabase,
  updateTeacherInDatabase,
  getTeacherDataFromDd,
} from "../../api/TeacherMaster/AddTeacher";
import "./AddTeacherForm.css";

const AddOrUpdateTeacherForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleTeacherAdded,
  handleTeacherUpdated,
}) => {
   const inticalteacherData = {
    teacherId: "",
    designation: "",
    emailId: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    classTeacher: "",
    transportSlab: "",

    personalDetailsData: {
        dob: new Date(),
        fatherName: "",
        motherName: "",
        spouseName: "",
        sex: "",
        cast: "",
        castCategory: "",
        bloodGroup: "",
    },

    addressDetailsData: {
        address: "",
        city: "",
        zipCode: "",
        state: "",
        homeTelephoneNo: "",
    },

    salaryDetailsData: {
        basic: "",
        acNo: "",
        lic: "",
        loan: "",
        pfApplied: "",
        pfNo: "",
        previousYearSalary: "",
        salaryAmount: "",
    },

    experienceDetailsData: {
        completionYear: "",
        joiningDate: new Date(),
        serviceInYears: "",
        confirmationDate: new Date(),
        experienceSummary: "",
        oldPFNo: "",
        previousJob: "",
        dateOfLeaving: new Date(),
        dateOfConfirmation: new Date(),
        lastJobSalary: "",
        reasonForLeaving: "",
    },
};


  const [teacherData, setTeacherData] = useState(inticalteacherData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch teacher data from Firebase when the modal is opened for update
      getTeacherData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getTeacherData = async (DocId) => {
    try {
      const teacher = await getTeacherDataFromDd(DocId);

      if (teacher) {
        setTeacherData(teacher);
      }
    } catch (error) {
      console.error("Error fetching teacher data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTeacherInDatabase(DocId, teacherData);

      setConfirmationMessage(response.message);

      setTeacherData({
        teacherName: "",
        teacherId: "",
        teacherSubject: "",
      });

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleTeacherUpdated();
      }, 2000); // Hide the message after 2 seconds
    } catch (error) {
      console.error("Error updating teacher data", error);
    }
  };

  const handleAdd = async () => {
    if (
      !teacherData.teacherName ||
      !teacherData.teacherId ||
      !teacherData.teacherSubject
    ) {
      setError(true);
    } else {
      try {
        const response = await addTeacherToDatabase(teacherData);

        setTeacherData({
          teacherName: "",
          teacherId: "",
          teacherSubject: "",
        });

        // Show a confirmation message
        setConfirmationMessage(response.message);
      } catch (error) {
        console.error("Error adding teacher data", error);
      }
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleTeacherAdded();
      }, 2000); // Hide the message after 2 seconds
    }
  };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}
      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {isUpdateOn ? "Update Teacher" : "Add Teacher"}
      </h2>

      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  First Name*
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Employee I’D*
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  FTransport Slab*
                </label>
                <select
                  name="transportType"
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="bus">--- Select ---</option>
                  <option value="bus">Bus</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
            </div>
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Mobile No*
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Mail I’D*
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Designation*
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Class Teacher*
                </label>
                <select
                  name="transportType"
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="bus">--- Select ---</option>
                  <option value="bus">Class A</option>
                  <option value="car">Class B</option>
                  <option value="bike">Class C</option>
                </select>
              </div>
            </div>
            <div className="form-first">
              <div>
                <label
                  htmlFor="fileInput"
                  className="mt-1 p-2 w-half text-[20px] font-bold block h-[200px] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                  style={{ color: "#333333" }}
                >
                  Photo+
                </label>

                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="addTeacher-components">
            <div className="components-name">
              <div
                onClick={() => setActiveCom(1)}
                className={activeCom === 1 ? "active-component" : ""}
              >
                Personal Details*
              </div>
              <div
                onClick={() => setActiveCom(2)}
                className={activeCom === 2 ? "active-component" : ""}
              >
                Salary Details*
              </div>
              <div
                onClick={() => setActiveCom(3)}
                className={activeCom === 3 ? "active-component" : ""}
              >
                Address Details*
              </div>
              <div
                onClick={() => setActiveCom(4)}
                className={activeCom === 4 ? "active-component" : ""}
              >
                Experience Details*
              </div>
            </div>
            <div className={activeCom === 1 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father Name*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother Name*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Spouse Name*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    DOB(DD/MM/YYYY)*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Sex*
                  </label>
                  <select
                    name="transportType"
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="bus">--- Select ---</option>
                    <option value="bus">Male</option>
                    <option value="car">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Cast*
                  </label>
                  <select
                    name="transportType"
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="bus">--- Select ---</option>
                    <option value="bus">Bus</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Cast Category*
                  </label>
                  <select
                    name="transportType"
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="bus">--- Select ---</option>
                    <option value="bus">Bus</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Blood Group*
                  </label>
                  <select
                    name="transportType"
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="bus">--- Select ---</option>
                    <option value="bus">Class A</option>
                    <option value="car">Class B</option>
                    <option value="bike">Class C</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={activeCom === 2 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Salary Amount*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    bank A/C No*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Basic
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous Year Salary
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    PF Applied*
                  </label>
                  <select
                    name="transportType"
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="bus">--- Select ---</option>
                    <option value="bus">Male</option>
                    <option value="car">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    PF No*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    LIC
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Loan
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 3 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Address
                  </label>
                  <textarea
                    type="text"
                    name="subjectCode"
                    rows="3"
                    cols="22"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    city
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    State
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Home Telephone
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 4 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Completion year
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Service in Year
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date Of Joining
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Confirmation
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Experience summery
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Old PF No.
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous Job
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Leaving
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Last Job Salary
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Reason For Leaving
                  </label>
                  <input
                    type="text"
                    name="subjectCode"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="addTeacher-buttons">
            <button>Add</button>
            <button>Close</button>
          </div>
        </form>

        {confirmationMessage && (
          <div className="text-green-500 mt-4 text-center">
            {confirmationMessage}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddOrUpdateTeacherForm;
