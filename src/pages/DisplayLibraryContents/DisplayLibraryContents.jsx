import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import BooksData from "./BooksData/BooksData";

const DisplayLibraryContents = () => {
  // For displaying contents based on individual route
  const location = useLocation();

  console.log(location.state);
  const { routeName, subject } = location?.state;
  return (
    <div>
      <h1 className="text-center font-bold text-xl lg:text-2xl">
        {subject.courseName}
      </h1>

      {routeName === "books" && <BooksData subject={subject}></BooksData>}
    </div>
  );
};

export default DisplayLibraryContents;
