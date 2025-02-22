import React from "react";
import { useNavigate } from "react-router-dom";

const LibraryContents = ({ subject, routeName }) => {
  const navigate = useNavigate();
  // const dynamicRouteVariable = subject.courseName.toLowerCase().split(" ").join("-"); // using split and join
  const dynamicRouteVariable = subject.courseName
    .replace(/ /g, "-")
    .toLowerCase(); //using regular expression
  return (
    <div
      key={subject._id}
      className="border p-4 bg-white text-gray-500 rounded-lg shadow-lg cursor-pointer"
      onClick={() =>
        navigate(`/library/${routeName}/${dynamicRouteVariable}`, {
          state: {
            subject,
            routeName,
          },
        })
      }
    >
      <img
        src={subject.bannerImage}
        className="w-full h-40 rounded-lg object-cover "
        alt=""
      />
      <p className="my-2 text-gray-700 font-semibold">{subject.courseName}</p>
      <p>{subject.courseCode}</p>
    </div>
  );
};

export default LibraryContents;
