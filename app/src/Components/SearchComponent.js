import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { searchUser } from '../api/TeacherMaster/AddTeacher';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [show ,setShow] = useState(false);
  const [searchResults, setSearchResults] = useState({ students: [], teachers: [] });

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
      console.error('Error:', error);
    }
  }, 100);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };
  const handleItemClick = (id) => {
    console.log(`Item with id ${id} clicked!`);
  };
  return (
    <div>
      <input
        className="text-center px-2 py-1 rounded-md"
        type="text"
        placeholder="Search Student/Teacher"
        value={searchTerm}
        onChange={handleChange}
      />

      {show &&
        <div>
          <ul>
            {searchResults.students.map((student) => (
              <li key={student.id} className="bg-blue-100 border p-2 my-2"
              onClick={() => handleItemClick(student.id)}
              >
                <span className="font-bold">{student.firstName}</span> -
                <span className="text-gray-500 ml-2">({student.studentId})</span>
                <span className="text-sm text-lightGray ml-2">Student</span>
              </li>
            ))}
          </ul>

          <ul>
            {searchResults.teachers.map((teacher) => (
              <li key={teacher.id} className="bg-green-100 border p-2 my-2 cursor-pointer text-black"
              onClick={() => handleItemClick(teacher.id)}
              >
                <span className="text-lg font-bold">{teacher.firstName}</span>
                <span className="text-gray-500 ml-2">({teacher.teacherId})</span>
                <span className="text-sm text-lightGray ml-2">Teacher</span>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default SearchComponent;
