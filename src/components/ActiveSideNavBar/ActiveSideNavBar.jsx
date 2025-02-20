import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const ActiveSideNavBar = ({ to, children }) => {
  const location = useLocation();
  let isLibraryActive;
  if (
    (to === "/library" && location.pathname.startsWith("/library/books")) ||
    (to === "/library/questions" &&
      location.pathname.startsWith("/library/questions")) ||
      
    (to === "/library/notes" &&
      location.pathname.startsWith("/library/notes")) ||
    (to === "/library/curriculums" &&
      location.pathname.startsWith("/library/curriculums"))
  ) {
    isLibraryActive = true;
  } else {
    isLibraryActive = false;
  }
  return (
    <NavLink
      end
      className={({ isActive }) =>
        isLibraryActive || isActive
          ? "bg-orange-200 text-orange-500 w-full p-2 lg:py-2 lg:px-4 rounded-lg"
          : "w-full py-2 px-4 hover:bg-orange-200 hover:text-orange-500 hover:rounded-lg"
      }
      to={to}
    >
      <div className="flex-none lg:flex gap-1 lg:gap-5 items-center">
        {children}
      </div>
    </NavLink>
  );
};

export default ActiveSideNavBar;

// ================================================== Another Approach =======================================================
/* 
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        // Manually check if the current path is "/library" OR "/library/books"
        const isLibraryActive =
          to === "/library" &&
          (location.pathname === "/library" || location.pathname === "/library/books");

        return isActive || isLibraryActive
          ? "bg-orange-200 text-orange-500 w-full p-2 lg:py-2 lg:px-4 rounded-lg"
          : "w-full py-2 px-4 hover:bg-orange-200 hover:text-orange-500 hover:rounded-lg";
      }}
    >
      <div className="flex-none lg:flex gap-1 lg:gap-5 items-center">
        {children}
      </div>
    </NavLink>
  );

*/
