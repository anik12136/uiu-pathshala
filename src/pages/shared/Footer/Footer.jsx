
import { Link } from "react-router-dom";
import uiuLogo from "../../../../src/assets/uiu_logo.png";
const Footer = () => {
  return (
    <footer className=" h-auto lg:h-80 bg-[#2D4059] grid grid-cols-1 lg:grid-cols-3 text-white p-6">
      {/* item-1 */}
      <div className=" flex flex-col justify-center items-center mb-3">
        <img
          alt="uiu logo"
          src={uiuLogo}
          className="w-[100px] h-[100px] block"
         
        ></img>
        <h1 className="font-medium text-lg">United International University</h1>
      </div>
      {/* item-2 */}
      <div className="grid grid-cols-2 place-items-center gap-4 mb-3">
        <div className="">
          <h1 className="font-semibold">Resources</h1>
          <ul className="ms-2">
            <li className="cursor-pointer">Blogs</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Career</li>
            <li className="cursor-pointer">Status</li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-semibold">Jobs</h1>
          <ul className="ms-2">
            <li className="cursor-pointer">Blogs</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Career</li>
            <li className="cursor-pointer">Status</li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-semibold">Courses</h1>
          <ul className="ms-2">
            <li className="cursor-pointer">Blogs</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Career</li>
            <li className="cursor-pointer">Status</li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-semibold">Affiliate</h1>
          <ul className="ms-2">
            <li className="cursor-pointer">Blogs</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Career</li>
            <li className="cursor-pointer">Status</li>
          </ul>
        </div>
      </div>
      {/* item-3 */}
      <div className="flex flex-col justify-center items-center">
        <p className="font-semibold text-3xl">Any Suggestion?</p>
        <Link to={"/contactUs"}><p className="border mt-2 py-4 px-10 rounded-full hover:bg-orange-500">Contact Us</p></Link>
      </div>
    </footer>
  );
};

export default Footer;
