// default image for user account. This will be displayed if there is no user image
import { useEffect, useRef, useState } from "react";
import defaultUserImage from "../../../../assets/images/user.png";
const UserProfileSection = () => {
    //This will handle the opening & closing state of the profile menu section
    const[isProfileMenuOpen,setIsProfileMenuOpen] = useState(false);
    // This will get the reference of the div that has all profile menu
    console.log(isProfileMenuOpen);
    const profileRef = useRef(null);

    const profileSectionHandler = (e)=>{
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }
    const closeMenu = () => {
        setIsProfileMenuOpen(false);
      };
    // This will catch the HTML tag and will look for any interaction between the div and the HTML tag 
    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (profileRef.current && !profileRef.current.contains(event.target)) {
            closeMenu();
          }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);

   
    return (
        <div >
            {/* Profile image section */}
            <button className="size-9 cursor-pointer" onClick={profileSectionHandler}>
                <img src={defaultUserImage}/>
            </button>
            {/* All other profile related menus */}
            <div ref={profileRef}  className={`size-96 bg-slate-900 ${isProfileMenuOpen ? "block" : "hidden"}`}>

            </div>
            
        </div>
    );
};

export default UserProfileSection;
