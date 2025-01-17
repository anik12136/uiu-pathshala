import { useState, useEffect, useRef, useContext } from "react";

import { Menu, X, LogOut, LogIn } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import CommunityDropdown from "../../../components/CommunityDropdown";

// default image for user account. This will be displayed if there is no user image
import defaultUserImage from "../../../assets/images/user.png";
//Icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { SiMessenger } from "react-icons/si";
import { MdOutlineExplore, MdSpaceDashboard } from "react-icons/md";
import { LiaBookSolid, LiaChalkboardTeacherSolid } from "react-icons/lia";
import { AuthContext } from "../../../providers/AuthProviders";
import "./Header.css";
import ProfileDropdownMenu from "../../../components/ProfileDropdown";

const Navbar = () => {
  const { user,logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const messagingHandler = () => {
    navigate("/messaging");
  };
  //LogIn and LogOut handling for mobile
  const handleLogOut = () => {
    closeMenu();
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navigateToLogIn = () => {
    navigate("/login");
    closeMenu();
  };

  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
              UIU Pathshala
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-orange-500">
              Dashboard
            </Link>
            <CommunityDropdown></CommunityDropdown>
            <Link to="/library" className="text-gray-600 hover:text-orange-500">
              Library
            </Link>
            <Link to="/tutor" className="text-gray-600 hover:text-orange-500">
              Tutor
            </Link>
            <Link to="/explore" className="text-gray-600 hover:text-orange-500">
              Explore
            </Link>
            {/* Notification button */}
            <button>
              <IoIosNotificationsOutline className="text-black font-extrabold text-2xl inline hover:text-orange-500" />
            </button>
            {/* Bookmarks button */}
            <Link to="/bookmark">
              <CiBookmark className="text-black font-extrabold text-2xl inline hover:text-orange-500" />
            </Link>
            {/* Messaging */}
            <button className="mr-2" onClick={messagingHandler}>
              <SiMessenger className="text-2xl text-orange-500 inline hover:text-orange-500" />
            </button>
            {/* user profile dropdown section */}
            <ProfileDropdownMenu></ProfileDropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {/* Messaging */}
            <button className="mr-2">
              <SiMessenger className="text-3xl text-orange-500 inline hover:text-orange-500" />
            </button>

            <button className="size-8 cursor-pointer mr-2">
              <Link to={"/user-profile"}>
                <img src={defaultUserImage} />
              </Link>
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-4/5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col space-y-4 p-6">
          <button
            onClick={closeMenu}
            className="self-end text-gray-600 hover:text-gray-900 focus:outline-none">
            <X size={24} />
          </button>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-gray-900 flex gap-4 "
            onClick={closeMenu}>
            <MdSpaceDashboard className="text-black font-extrabold text-2xl inline" />{" "}
            Dashboard
          </Link>
          <CommunityDropdown onClick={closeMenu}></CommunityDropdown>
          <Link
            to="/library"
            className="text-gray-600 hover:text-gray-900 flex gap-4"
            onClick={closeMenu}>
            <LiaBookSolid className="text-black font-extrabold text-2xl inline" />{" "}
            Library
          </Link>

          {/* Explore */}
          <Link
            to="/explore"
            onClick={closeMenu}
            className="text-gray-600 hover:text-orange-500 flex gap-4">
            <MdOutlineExplore className="text-black font-extrabold text-2xl inline" />{" "}
            <span>Explore </span>
          </Link>

          {/* Notification */}
          <button onClick={closeMenu} className="flex gap-4 text-gray-600">
            <IoIosNotificationsOutline className="text-black font-extrabold text-2xl inline" />{" "}
            <span>Notification </span>
          </button>
          {/* Bookmarks */}
          <button className="flex gap-4 text-gray-600">
            <CiBookmark className="text-black font-extrabold text-2xl inline hover:text-orange-500" />{" "}
            <span>Bookmarks </span>
          </button>
          <Link
            to="/tutor"
            className="text-gray-600 hover:text-gray-900 flex gap-4"
            onClick={closeMenu}>
            <LiaChalkboardTeacherSolid className="text-black font-extrabold text-2xl inline" />{" "}
            Tutor
          </Link>
          {user ? (
            <button
              className="flex items-center w-full  py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogOut}>
              <LogOut className="mr-3 h-5 w-5" />
              LogOut
            </button>
          ) : (
            <button
              className="flex items-center w-full  py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={navigateToLogIn}>
              <LogIn className="mr-3 h-5 w-5" />
              LogIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
