import React from "react";
import { Outlet } from "react-router-dom";
import ActiveSideNavBar from "../../components/ActiveSideNavBar/ActiveSideNavBar";
import { FaBook } from "react-icons/fa";
import { PiExam } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";
import { IoAppsOutline } from "react-icons/io5";

const Library = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6">
      <div className="w-full flex flex-row lg:flex-col gap-0 lg:gap-3 p-0 lg:p-4">
        {/* Library sub menu */}
        <ActiveSideNavBar to="/library">
          {" "}
          <FaBook />
          Books
        </ActiveSideNavBar>
        <ActiveSideNavBar to="/library/questions">
          {" "}
          <PiExam />
          Questions
        </ActiveSideNavBar>
        <ActiveSideNavBar to="/library/notes">
          {" "}
          <LuNotebookPen />
          Notes
        </ActiveSideNavBar>
        <ActiveSideNavBar to="/library/curriculums">
          <IoAppsOutline />
          Curriculums
        </ActiveSideNavBar>
      </div>
      <div className="w-full min-h-dvh border my-4 p-4 bg-[#F0F8FF] rounded-2xl col-span-1 lg:col-span-5 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Library;
