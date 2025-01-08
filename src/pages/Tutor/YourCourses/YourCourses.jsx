import { useContext, useEffect, useState } from "react";
// import InstructorDashboardCourses from "./InstructorDashboardCourses/InstructorDashboardCourses";
import { AuthContext } from "../../../providers/AuthProviders";

const YourCourses = ({ courses }) => {
    const user = useContext(AuthContext);
    console.log(courses);
    


    console.log(courses ? courses : "data nai");

    return (
        <div className="text-center">
            <p className="text-4xl my-7">Your Courses</p>
            <div className="flex justify-center items-center mb-6">
                <div className="grid md:lg:grid-cols-3 gap-4">
                    {courses?.map((course) => (
                        <div>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 mx-auto my-5">
                                <img
                                    className="w-full h-48 object-cover"
                                    src={course.bannerUrl}
                                    alt={course.title}
                                />
                                <div className="px-6 py-4">
                                    <h2 className="font-bold text-xl mb-2">{course.title}</h2>
                                    <p className="text-gray-700 text-sm mb-2"><strong>Subject:</strong> {course.subject}</p>
                                    <p className="text-gray-700 text-sm mb-2"><strong>Teacher:</strong> {course.teacherName}</p>
                                    <p className="text-gray-700 text-sm mb-2"><strong>Email:</strong> {course.email}</p>
                                    <p className="text-gray-700 text-sm mt-2">
                                        {/* {course.courseDescription} */}
                                    
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                        Enroll Now
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ms-2">
                                        Details...
                                    </button>
                                </div>
                            </div>
                           

                        </div>
                    ))}
                </div>
            </div>

            {/* ----------------- */}
        </div>
    );

};

export default YourCourses;
