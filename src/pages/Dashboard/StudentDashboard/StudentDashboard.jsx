import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../Hooks/useUser";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext); // Get logged-in user
    const { dbUser, loading, error } = useUser(); // Fetch user from DB

    return (
        <div className="flex">           
            <aside className="w-full lg:w-1/4 bg-orange-500 text-white p-4">
            <div className="flex flex-col items-center mb-8">
                <h2>Student Dashboard</h2>
                {
                   
                    <img src = { dbUser?.photoURL || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" } 
                    alt="Profile"
                    className="rounded-full mb-4 h-14"/>
                }
                <h2 className="text-lg font-semibold">{dbUser?.name || user?.displayName || "Mr. X"}</h2>

                <p className="text-sm">{dbUser?.email || user?.email}</p>
            </div>

            {/* Vertical Navigation Links */}
            <nav>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/dashboard/home"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/enrolledCourses"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Courses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/myBooks"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Books
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/myPdf"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Pdf
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/notes"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Notes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/questions"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Questions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/myContest"
                            className={({ isActive }) =>
                                isActive
                                    ? "block bg-orange-600 p-2 rounded font-bold"
                                    : "block hover:bg-orange-600 p-2 rounded"
                            }
                        >
                            Contest
                        </NavLink>
                    </li>
                    {/* <li>
                            <NavLink
                                to="/dashboard/tutors"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block bg-orange-600 p-2 rounded font-bold"
                                        : "block hover:bg-orange-600 p-2 rounded"
                                }
                            >
                                Tutors
                            </NavLink>
                        </li> */}
                    {/* <li>
                            <NavLink
                                to="/dashboard/settings"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block bg-orange-600 p-2 rounded font-bold"
                                        : "block hover:bg-orange-600 p-2 rounded"
                                }
                            >
                                Settings
                            </NavLink>
                        </li> */}
                </ul>
            </nav>
        </aside>

            {/* Main Content */}
            <main className="w-full lg:w-3/4 bg-gray-100 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default StudentDashboard;
