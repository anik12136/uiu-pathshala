import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../Hooks/useUser";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaBook, FaFilePdf, FaStickyNote, FaQuestion, FaTrophy } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const { dbUser } = useUser();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`fixed lg:relative lg:top-0 left-0 h-screen w-64 lg:w-1/4 p-6 z-10 transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 
        bg-orange-400 lg:bg-white text-white lg:text-black shadow-lg`}
            >
                {/* Close Button (Mobile View) */}
                <button
                    className="absolute top-4 right-4 lg:hidden text-2xl"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FiX />
                </button>

                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6 p-4 rounded-lg bg-orange-600/30 lg:bg-gray-100 shadow-md">
                    <img
                        src={
                            dbUser?.photoURL ||
                            "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                        }
                        alt="Profile"
                        className="rounded-full h-16 w-16 border-2 border-white shadow-lg"
                    />
                    <h2 className="mt-3 text-lg font-semibold text-white lg:text-black">
                        {dbUser?.name || user?.displayName || "Mr. X"}
                    </h2>
                    <p className="text-sm text-gray-200 lg:text-gray-600">{dbUser?.email || user?.email}</p>
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-300 lg:border-gray-400 mb-4" />

                {/* Navigation Links */}
                <nav className="mt-4">
                    <ul className="space-y-3">
                        {[
                            { to: "/dashboard/home", label: "Home", icon: <FaHome /> },
                            { to: "/dashboard/enrolledCourses", label: "Courses", icon: <IoSchoolSharp /> },
                            { to: "/dashboard/myBooks", label: "Books", icon: <MdMenuBook /> },
                            { to: "/dashboard/myPdf", label: "PDFs", icon: <FaFilePdf /> },
                            { to: "/dashboard/myNotes", label: "Notes", icon: <FaStickyNote /> },
                            { to: "/dashboard/myQuestions", label: "Questions", icon: <FaQuestion /> },
                            { to: "/dashboard/myContest", label: "Contest", icon: <FaTrophy /> }
                        ].map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 p-3 rounded-lg transition-all duration-200 
                             ${isActive ? "bg-orange-300 font-bold" : "hover:bg-orange-600"}`
                                    }
                                >
                                    {item.icon} {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>


            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-[#F0F8FF] rounded-2xl p-4">
                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-orange-500 text-2xl fixed top-16 left-4 z-10"
                    onClick={() => setSidebarOpen(true)}
                >
                    <FiMenu />
                </button>

                <Outlet />
            </main>
        </div>
    );
};

export default StudentDashboard;
