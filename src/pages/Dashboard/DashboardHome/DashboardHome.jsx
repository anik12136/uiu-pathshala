import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import CalendarComponent from "../../../components/CalendarComponent";
import useAllUser from "../../../Hooks/useAllUser";
import useUser from "../../../Hooks/useUser";
import AllUsers from "../Admin/AllUsers/AllUsers";
import AnnouncementsList from "../AnnouncementsList/AnnouncementsList";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { dbUser } = useUser();

  if (dbUser?.role === "admin") {
    return <AllUsers />;
  } else {
    return (
      <div>
        {/* Banner Section */}
        <div className="relative w-full h-60 bg-gradient-to-r from-purple-500 to-orange-600 text-white flex items-center justify-center shadow-md rounded-lg">
          <div className="text-center px-5">
            <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
            <p className="text-lg mt-2 italic">"Success is not final, failure is not fatal: it is the courage to continue that counts."</p>
            <p className="text-sm mt-1 opacity-80">- Winston Churchill</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="md:lg:flex gap-5 mt-6">
          <CalendarComponent />
          <AnnouncementsList />
        </div>
      </div>
    );
  }
};

export default DashboardHome;
