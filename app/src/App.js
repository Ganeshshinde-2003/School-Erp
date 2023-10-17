import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddClassAndSection from "./Pages/AddClassAndSection/AddClassAndSection";
import AddOptionalSubject from "./Pages/AddOptionalSubject/AddOptionalSubject";
import Sidebar from "./Components/Sidebar";
import AddSubjects from "./Pages/AddSubjects/AddSubjects";
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
