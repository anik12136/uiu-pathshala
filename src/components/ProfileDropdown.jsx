import { useState, useEffect, useRef, useContext } from "react";
import { User, LogOut, ChevronDown, LogIn } from "lucide-react";
import defaultImage from "../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

export default function ProfileDropdownMenu() {
  // Context data
  const { user, logOut } = useContext(AuthContext);
  // navigate to login route
  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate("/login");
  };

  //Profile dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handling LogOut
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="w-8 h-8 relative">
        <img src={defaultImage} className="inline-block" />
        <ChevronDown className="absolute -bottom-0 right-0 w-3 h-3 text-white bg-slate-400 rounded-full"></ChevronDown>
      </button>
      {isOpen && (
        <div className="absolute mt-2 right-1 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <Link
                to={"/user-profile"}
                className=" flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  LogOut
                </button>
              ) : (
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={navigateToLogIn}
                >
                  <LogIn className="mr-3 h-5 w-5" />
                  LogIn
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
