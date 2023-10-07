import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddClassAndSection from "./Pages/AddClassAndSection/AddClassAndSection";
import AddOptionalSubjects from "./Pages/AddOptionalSubject/AddOptionalSubject";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-class-and-section" element={<AddClassAndSection />} />
        <Route path="/add-optional-subject" element={<AddOptionalSubjects />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
