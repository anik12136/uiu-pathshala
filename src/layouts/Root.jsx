import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import { useState } from "react";
import { use } from "react";
const Root = () => {
 
  return (
    <div>
      <Navbar></Navbar>

      <div className="mt-16">
        <Outlet></Outlet>
      </div>
        <Footer></Footer>
    </div>
  );
};

export default Root;
