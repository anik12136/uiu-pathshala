import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProviders';
import CalendarComponent from '../../../components/CalendarComponent';

const DashboardHome = () => {

    const { user } = useContext(AuthContext);
    // console.log(user);

    return (
        <div>
            <main className="flex-1 bg-gray-100 p-6">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">Course Dashboard</h1>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded p-2 w-1/3"
                    />
                </header>

                <section className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Active Courses</h2>
                        <ul className="list-disc pl-4 text-sm">
                            <li>Course 1: Introduction to Web Development</li>
                            <li>Course 2: Advanced JavaScript</li>
                            <li>Course 3: Database Management</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Next Class</h2>
                        <p className="text-sm">Course: Advanced JavaScript</p>
                        <p className="text-sm">Time: Jan 15, 10:00 AM</p>
                        <p className="text-sm">Mode: Online</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Course Progress</h2>
                        <ul className="list-disc pl-4 text-sm">
                            <li>Web Development: 75% completed</li>
                            <li>Advanced JavaScript: 50% completed</li>
                            <li>Database Management: 40% completed</li>
                        </ul>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-6">
                    {/* Recent Announcements */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Recent Announcements</h2>
                        <ul className="list-disc pl-4 text-sm">
                            <li>Assignment 2 for Web Development is due on Jan 20.</li>
                            <li>Live session on "JavaScript Best Practices" scheduled for Jan 18.</li>
                            <li>New resources added for Database Management.</li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Resources</h2>
                        <ul className="list-disc pl-4 text-sm">
                            <li>
                                <a href="#" className="text-blue-500">
                                    Web Development: Lecture Notes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-500">
                                    Advanced JavaScript: Cheat Sheet
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-500">
                                    Database Management: Video Tutorials
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* calendar */}
                
                    <CalendarComponent></CalendarComponent>
               
            </main>
        </div>
    );
};

export default DashboardHome;