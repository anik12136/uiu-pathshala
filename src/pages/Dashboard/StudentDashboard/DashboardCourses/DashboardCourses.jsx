import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../providers/AuthProviders';
import CourseCard from '../../../../components/CourseCard';


const DashboardCourses = () => {


    const [bookMarks, setBookMarks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.email) {
            console.log("No user email found.");
            setLoading(false);
            return;
        }

        const fetchUsers = async () => {
            try {
                // console.log("Fetching data for:", user.email);
                const response = await axios.get(`https://server-uiu-pathshala.vercel.app/bookMarks/${user.email}`);
                setBookMarks(response.data);
            } catch (err) {
                console.error("Error fetching data:", err.message);
                setError(err.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user]);

console.log(bookMarks);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
                {bookMarks?.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
    
};

export default DashboardCourses;