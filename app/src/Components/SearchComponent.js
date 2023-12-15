import React, { useState } from "react";
import debounce from "lodash/debounce";
import { searchUser } from "../api/TeacherMaster/AddTeacher";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState({
    students: [],
    teachers: [],
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(async (term) => {
    try {
      const trimmedTerm = term.trim();
      if (trimmedTerm) {
        const lowercaseTerm = trimmedTerm.toLowerCase(); // Convert searchTerm to lowercase for case-insensitive matching
        const results = await searchUser(lowercaseTerm);
        setShow(true);
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, 100);

  const handleChange = (event) => {
    const term = event.target.value;
    console.log(term);
    setSearchTerm(term);
    debouncedSearch(term);
  };
  const handleItemClick = (id) => {
    console.log(`Item with id ${id} clicked!`);
    navigate(`/searchresult/${id}`);
    setSearchTerm("");
    setShow(false);
  };
  return (
    <div className="search-container">
      <input
        className="text-center px-2 py-1 rounded-md"
        type="text"
        placeholder="Search Student/Teacher"
        value={searchTerm}
        onChange={handleChange}
      />

      {show && (
        <div className="search-show">
          <ul>
            {searchResults.students.map((student) => (
              <li
                key={student.id}
                className="bg-[#888787] border rounded-lg p-2 my-2 cursor-pointer"
                onClick={() => handleItemClick(student.id)}
              >
                <span className="font-bold">{student.firstName}</span> -
                <span className="text-white ml-2">({student.studentId})</span>
                <span className="text-sm text-lightGray ml-2">Student</span>
              </li>
            ))}
          </ul>

          <ul>
            {searchResults.teachers.map((teacher) => (
              <li
                key={teacher.id}
                className="bg-[#888787] border rounded-lg p-2 my-2 cursor-pointer"
                onClick={() => handleItemClick(teacher.id)}
              >
                <span className="font-bold">{teacher.firstName}</span>
                <span className="text-white ml-2">({teacher.teacherId})</span>
                <span className="text-sm text-lightGray ml-2">Teacher</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
