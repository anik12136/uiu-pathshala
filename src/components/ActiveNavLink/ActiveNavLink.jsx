import { NavLink } from "react-router-dom";

const ActiveNavLink = ({ to, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "underline decoration-orange-500 decoration-2 underline-offset-4 text-orange-400"
          : "w-full py-2 px-4 hover:bg-orange-200 hover:text-orange-500 hover:rounded-lg "
      }
      to={to}
    >
      <div className="flex-none lg:flex gap-1 lg:gap-5 items-center">
        {children}
      </div>
    </NavLink>
  );
};

export default ActiveNavLink;
