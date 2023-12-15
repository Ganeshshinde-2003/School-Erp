import React from "react";
import { useParams } from "react-router-dom";

const SearchDetailsShow = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Search Details for ID: {id}</h1>
    </div>
  );
};

export default SearchDetailsShow;
