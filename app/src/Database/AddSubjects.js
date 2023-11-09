const AddSubject = [
    {
      "SI.No": 1,
      "Subject Name": "Hindi",
      "Subject Total Marks Reduced ": 100,
      "Subject Code": 547,
    },
    {
        "SI.No": 2,
        "Subject Name": "German",
        "Subject Total Marks Reduced ": 100,
        "Subject Code": 658,
    },
    {
        "SI.No": 3,
        "Subject Name": "Sanskrit",
        "Subject Total Marks Reduced ": 100,
        "Subject Code": 222,
    },
    {
        "SI.No": 4,
        "Subject Name": "French",
        "Subject Total Marks Reduced ": 100,
        "Subject Code": 329,
    },
  ];
  
  export default AddSubject;


  // import React, { useEffect, useState } from "react";
// import DynamicTable from "../../Components/DynamicTable";
// import AddButton from "../../Components/AddButton";
// import "./AddSubject.css";
// import AddSubjectForm from "./AddSubjectForm";
// import { deleteSubject, getAddSubjectDatabase, updateSubjectInDatabase } from "../../api/subject";

// import { Oval } from 'react-loader-spinner'

// const AddSubject = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [subjectAdded, setSubjectAdded] = useState(false);
  // const [subjectData, setSubjectData] = useState([]); // State to hold fetched data
  // const [isLoading, setIsLoading] = useState(true);
  // const [dataChanged, setDataChanged] = useState(false);

  // useEffect(() => {
  //   getAddSubjectDatabase()
  //     .then((data) => {
  //       // const filteredData = data.map(({ id, ...rest }) => rest);
  //       setSubjectData(data);
  //       setIsLoading(false);

  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);

  //     });
  // }, []);

  // // useEffect(() => {
  // //   if (dataChanged) {
  // //     getAddSubjectDatabase()
  // //       .then((data) => {
  // //         setSubjectData(data);
  // //         setIsLoading(false);
  // //         setDataChanged(false);
  // //       })
  // //       .catch((error) => {
  // //         console.error("Error fetching data:", error);
  // //         setIsLoading(false);
  // //       });
  // //   }
  // // }, [dataChanged]);

  // const updateData = {
  //   Class: "Updated Class Name",
  //   Subject_Name: "Updated Subject Name",
  // };

  // // const handleDeleteClick = (id) => {
  // //   deleteSubject(id).then(()=>{
  // //     setSubjectData(prevData => prevData.filter(item => item._id !== id))
  // //     }).catch(err => console.log(err));

  // //   }

  // const handleActionfunction = async (actionType, documentId) => {
  //   console.log('document with ID:', documentId);

  //   if (actionType === 'edit') {
  //     // Handle edit action with documentId
  //     const response = updateSubjectInDatabase(documentId, updateData)
  //     console.log('Edit document with ID:', documentId);
  //     if (response.success) {
  //       // If the delete operation was successful, set dataChanged to true
  //       setDataChanged(true);
  //     }
  //   } else if (actionType === 'delete') {
  //     // Handle delete action with documentId
  //     const response = deleteSubject(documentId)
  //     console.log('Delete document with ID:', documentId);

  //     if (response.success) {
  //       // If the delete operation was successful, set dataChanged to true
  //       setDataChanged(true);
  //     }
  //   };

  // };