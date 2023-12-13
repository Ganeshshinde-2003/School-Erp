import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddClassAndSection from "./Pages/AddClassAndSection/AddClassAndSection";
import AddOptionalSubject from "./Pages/AddOptionalSubject/AddOptionalSubject";
import Sidebar from "./Components/Sidebar";
import AddSubjects from "./Pages/AddSubjects/AddSubjects";
import AddTeacher from "./Pages/AddTeacher/AddTeacher.js";
import AddStudent from "./Pages/AddStudentsDirectly/AddStudent.js";
import AddStudentPage from "./Pages/AddStudentApplication/AddStudentApplication.js";
import PendingRequest from "./Pages/PendingRequest/PendingReauest.js";
import AddDriver from "./Pages/AddDriver/AddDriver.js";
import LocateDriver from "./Pages/LocateDriver/LocateDriver.js";
import ExpenseAdding from "./Pages/ExprenseAdding/ExpenseAdding.js";
import AddHoliday from "./Pages/AddHolidays/AddHoliday.js";
import AddStop from "./Pages/AddStopFees/AddOrUpdateStopFees.js";
import AddFeeSlab from "./Pages/AddFeeSlab/AddFeeSlab.js";
import AddNoticePage from "./Pages/AddNotice/AddNotice.js";
import SalaryToTeacher from "./Pages/SalaryToTeacher/SalaryToTeacher.js";
import AddVehicle from "./Pages/AddVehicles/AddVehicle.js";
import AddNonTeachingStaff from "./Pages/AddNonTeachingStaff/AddNonTeachingStaff.js";
import SalaryToNonTeachingStaff from "./Pages/SalaryToNonTeachingStaff/SalaryToNonTeachingStaff.js";
import AddFeeStructure from "./Pages/AddFeeStructure/AddFeeStructure.js";
import AddTimetable from "./Pages/Timetable/AddTimetable.js";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/class-master/add-subjects"
              element={<AddSubjects />}
            />
            <Route
              path="/class-master/add-optional-subject"
              element={<AddOptionalSubject />}
            />
            <Route
              path="/class-master/add-class-and-section"
              element={<AddClassAndSection />}
            />
            <Route
              path="/teacher-master/add-teacher"
              element={<AddTeacher />}
            />
            <Route
              path="/student-master/add-student"
              element={<AddStudent />}
            />
            <Route
              path="/transport-master/add-driver"
              element={<AddDriver />}
            />
            <Route
              path="/transport-master/locate-driver"
              element={<LocateDriver />}
            />
            <Route
              path="/student-master/add-student-Application"
              element={<AddStudentPage />}
            />
            <Route
              path="/student-master/pending_request"
              element={<AddStudent />}
            />
            <Route
              path="/student-master/pending-request"
              element={<PendingRequest />}
            />
            <Route
              path="/hodidays-master/add-holiday"
              element={<AddHoliday />}
            />
            <Route
              path="transport-master/add-stops-fees"
              element={<AddStop />}
            />
            <Route
              path="/expense-adding/add-expense"
              element={<ExpenseAdding />}
            />
            <Route
              path="/fee-structures/add-fee-slab"
              element={<AddFeeSlab />}
            />
            <Route
              path="/transport-master/add-vehciles"
              element={<AddVehicle />}
            />
            <Route
              path="/fee-structures/add-fee-structures"
              element={<AddFeeStructure />}
            />
            <Route
              path="/send-notice/add-notices"
              element={<AddNoticePage />}
            />
            <Route
              path="/staff-management/add-non-teaching-staff"
              element={<AddNonTeachingStaff />}
            />
            <Route
              path="/staff-management/salary-to-teachers"
              element={<SalaryToTeacher />}
            />
            <Route
            path="/staff-management/salary-to-non-teaching-staff"
            element={<SalaryToNonTeachingStaff />}
          />
          <Route
          path="/timetable/add-timetable"
          element={<AddTimetable/>}
        />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
