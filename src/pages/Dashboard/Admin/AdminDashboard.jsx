import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../Hooks/useUser";
import { AuthContext } from "../../../providers/AuthProviders";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext); // Get logged-in user from context
  const { dbUser, loading, error } = useUser(); // Get database user info

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-orange-500 text-white p-4">
        <div className="flex flex-col items-center mb-8">
          <h2>Admin Dashboard</h2>
          <img
            src={
              dbUser?.photoURL ||
              "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            }
            alt="Profile"
            className="rounded-full mb-4 h-14"
          />
          {/* Display name with fallback */}
          <h3 className="text-lg font-semibold">
            {dbUser?.name }
          </h3>
          <p className="text-sm">{dbUser?.role || "Admin"}</p>
          <p className="text-sm">{user?.email}</p>
        </div>

        {/* Vertical Navigation Links */}
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard/pdf"
                className={({ isActive }) =>
                  isActive
                    ? "block bg-orange-600 p-2 rounded font-bold"
                    : "block hover:bg-orange-600 p-2 rounded"
                }>
                Manage classes
              </NavLink>
            </li>
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

export default AdminDashboard;
