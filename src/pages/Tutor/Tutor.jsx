import { NavLink, Outlet } from "react-router-dom";

const Tutor = () => {
  return (
    <div className="p-4">
      {/* Submenu */}
      <nav className="flex justify-center space-x-8 border-b pb-2 mb-4">
        <NavLink
          to="/tutor"
          end
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/tutor/live-sessions"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`
          }
        >
          Live Sessions
        </NavLink>
        <NavLink
          to="/tutor/teaching"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`
          }
        >
          Teaching
        </NavLink>
      </nav>

      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};

export default Tutor;
