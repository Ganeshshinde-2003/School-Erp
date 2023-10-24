// // Modal.js
// import React, { useState } from "react";
// import addSubjectToDatabase from "../api/subject"; // Import your addSubjectToDatabase function

// const Modal = ({ isOpen, onClose, onSubjectAdded }) => {
//   const [subjectData, setSubjectData] = useState({
//     className: "",
//     subjectName: "",
//     subjectId: "", // Adding subjectId for your API
//   });

//   const [confirmationMessage, setConfirmationMessage] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSubjectData({
//       ...subjectData,
//       [name]: value,
//     });
//   };

//   const handleAdd = async () => {
//     // Call the addSubjectToDatabase function with subjectData
//     await addSubjectToDatabase(subjectData);

//     // Reset the subjectData
//     setSubjectData({
//       className: "6",
//       subjectName: "",
//       subjectId: "",
//     });

//     // Show a confirmation message
//     setConfirmationMessage("Subject has been successfully added!");

//     // Close the modal after a delay (you can customize the delay as needed)
//     setTimeout(() => {
//       setConfirmationMessage(null);
//       onClose();
//       onSubjectAdded();
//     }, 2000); // Hide the message after 2 seconds
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
//         <span className="close absolute top-0 right-0 m-2 text-gray-600 cursor-pointer" onClick={onClose}>
//           &times;
//         </span>
//         <h2 className="text-xl font-semibold mb-4">Add Subject</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Class Name</label>
//             <input
//               type="text"
//               name="className"
//               value={subjectData.className}
//               onChange={handleInputChange}
//               className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Subject Name</label>
//             <input
//               type="text"
//               name="subjectName"
//               value={subjectData.subjectName}
//               onChange={handleInputChange}
//               className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Subject Code</label>
//             <input
//               type="text"
//               name="subjectId"
//               value={subjectData.subjectId}
//               onChange={handleInputChange}
//               className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleAdd}
//             className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Add Subject
//           </button>
//         </form>

//         {confirmationMessage && (
//           <div className="text-green-500 mt-4 text-center">{confirmationMessage}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Modal;
