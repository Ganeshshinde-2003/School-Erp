import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddClassAndSection from "./Pages/AddClassAndSection/AddClassAndSection";
import AddOptionalSubject from "./Pages/AddOptionalSubject/AddOptionalSubject";
import Sidebar from "./Components/Sidebar";
import AddSubjects from "./Pages/AddSubjects/AddSubjects";
import AddTeacher from "./Pages/AddTeacher/AddTeacher.js";
import AddStudent from "./Pages/AddStudents/AddStudent.js";
import AddDriver from "./Pages/AddDriver/AddDriver.js";
import AddStudentPage from "./Pages/AddStudentApplication/AddStudentApplication.js"

// import {db} from "./config/firebase";
// import {getDocs, collection} from "firebase/firestore";

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
              />
              <Route 
              path="/student-master/add-student-Application"
              element={<AddStudentPage/>}
              />
              <Route 
              path="/student-master/pending_request"
              element={<AddStudent />}
              />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
