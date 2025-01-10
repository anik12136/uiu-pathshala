import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      {/* Course Banner */}
      <img
        src={course.banner}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      {/* Course Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        <p className="text-sm font-medium text-gray-800">
          Instructor: <span className="text-blue-600">{course.instructor}</span>
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
