import React from "react";
import { useLocation, useParams } from "react-router-dom";
import TextNameComponent from "../../Components/TextNameComponent";
import "./SearchDetails.css";

const SearchDetailsShow = () => {
  const { id } = useParams();
  const location = useLocation();
  const { resultData } = location.state || {};
  const who = location.state.who;

  console.log(resultData);

  return (
    <div>
      {resultData && (
        <div className="search-wrapper-details">
          <div className="search-container-details">
            <div className="search-wrapper">
              <TextNameComponent
                head="Name"
                disc={`${resultData.firstName} ${resultData.lastName}`}
              />
              <TextNameComponent head="Class" disc={resultData.joiningClass} />
              <TextNameComponent head="Mobile No." disc={resultData.mobileNo} />
              <TextNameComponent
                head="Year joined"
                disc={resultData.admissionDate}
              />
            </div>
            <div className="search-wrapper">
              <TextNameComponent
                head={who === "student" ? "StudentId" : "TeacherId"}
                disc={
                  who === "student"
                    ? resultData.studentId
                    : resultData.teacherId
                }
              />
              <TextNameComponent
                head="Transport Slab "
                disc={resultData.transportSlab}
              />
              <TextNameComponent head="Fee Slab" disc={resultData.feeslab} />
              <TextNameComponent
                head="Section"
                disc={resultData.joiningClass}
              />
            </div>
          </div>
          <div className="profile-container">
            <img
              src={resultData.profilePic}
              alt={`${resultData.firstName} ${resultData.lastName}`}
              className="profile-img-search-deatils"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDetailsShow;
