import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProviders';
import axios from 'axios';

const MyContest = () => {

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
                const response = await axios.get(`https://server-uiu-pathshala.vercel.app/myContest/${user.email}`);
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
                <ul>
                    <li>
                        {bookMarks?.map((contest) => (
                            <div className=' border-2 my-2 p-2 '>{contest.contestId}</div>
                        ))}
                    </li>
                </ul>
            </div>
        </div>
    );

};

export default MyContest;