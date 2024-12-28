import { useContext, useEffect, useState } from "react";
import Banner from "../shared/Banner/Banner";
import FavoriteTeachers from "./Favorite-Teachers/FavoriteTeachers";
import { MdArrowForwardIos } from "react-icons/md";
import RecentlyUploaded from "./RecentlyUploaded/RecentlyUploaded";
import { FaArrowRight } from "react-icons/fa";
import programmingCommunityImage from "../../assets/images/programming-community.webp";
import generalCommunity from "../../assets/images/general-community.webp";
import departmentalImage from "../../assets/images/departments.webp";
import libraryImage from "../../assets/images/library.webp";
import { AuthContext } from "../../providers/AuthProviders";
import { Link } from "react-router-dom";

const Home = () => {
  // Context value
  const {user} = useContext(AuthContext);
  console.log("User data",user);
  
  
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    // fetch("../../../public/fakeDB/top-rated-tutors.json")
    fetch("http://localhost:7000/demoCourses")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  return (
    <main className="mt-16">
      {/* Banner Section */}
      <Banner />
      {/* Your Favorite Teacher */}
      <section className="max-w-7xl mx-auto my-4 rounded-lg">
        <h1 className="text-gray-600 text-4xl py-6">Your Favorite Teachers</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5">
          {teachers.map((teacher) => (
            <FavoriteTeachers
              key={teacher.id}
              teacher={teacher}></FavoriteTeachers>
          ))}
          <div className="w-40 h-40 border flex flex-col gap-2 p-4 justify-center items-center bg-white text-gray-500 rounded-lg shadow-lg cursor-pointer">
            <span>View All</span>
            <MdArrowForwardIos className="text-2xl" />
          </div>
        </div>
      </section>
      {/* Recently Uploaded */}
      <section className="max-w-7xl mx-auto my-6 rounded-lg ">
        <h1 className="text-gray-600 text-4xl py-6">Recently Uploaded</h1>
        <div className="grid gird-cols-1 lg:grid-cols-4 place-content-center lg:place-content-start gap-3 px-2 lg:px-0">
          {teachers.slice(0, 4).map((course) => (
            <RecentlyUploaded
              key={course.id}
              course={course}></RecentlyUploaded>
          ))}
        </div>
        {/* View all recently uploaded courses */}
        <button className="cursor-pointer rounded-lg border w-36 p-3 flex justify-center items-center gap-2 border-orange-300 mt-2">
          View All <FaArrowRight />
        </button>
      </section>
      {/* Programming Community */}
      <section className=" max-w-7xl mx-auto rounded-lg h-auto lg:h-96 my-5 px-6 py-6 lg:py-0 bg-[#ddfeae] flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h1 className="text-5xl text-lime-900 font-bold ">
            Are You A Programmer?
          </h1>
          <p className="max-w-96 text-justify my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            ipsum eius minus velit sint accusamus accusantium ducimus ex
            eligendi deserunt?
          </p>
          <button className="border border-lime-900 text-lime-900 rounded-full p-3 hover:bg-lime-200">
            Programming Community
          </button>
        </div>
        <div>
          <img
            src={programmingCommunityImage}
            className="w-96 object-contain"
          />
        </div>
      </section>
      {/* General Community */}
      <section className=" max-w-7xl mx-auto rounded-lg h-auto lg:h-96 my-5 lg:my-10 px-6 py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center">
        <div>
          <img
            src={generalCommunity}
            className="w-96 object-contain rounded-full"
          />
        </div>
        <div className="mt-5">
          <h1 className="text-5xl font-bold ">Get Updated Every Time</h1>
          <p className="max-w-96 text-justify my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            ipsum eius minus velit sint accusamus accusantium ducimus ex
            eligendi deserunt?
          </p>
          <Link
            to="General_Community"
            className="border border-gray-500 hover:bg-gray-200 rounded-full p-3 ">
            General Community
          </Link>
        </div>
      </section>
      {/* Departments */}
      <section className=" max-w-7xl mx-auto rounded-lg h-auto lg:h-96 my-5 px-6 py-6 lg:py-0 bg-[#b4e8f9] flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h1 className="text-5xl  font-bold ">Choose Your Department</h1>
          <p className="max-w-96 text-justify my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            ipsum eius minus velit sint accusamus accusantium ducimus ex
            eligendi deserunt?
          </p>
          <button className="border border-black rounded-full p-3 hover:bg-blue-100">
            Browse all departments
          </button>
        </div>
        <div>
          <img src={departmentalImage} className="w-96 object-contain" />
        </div>
      </section>
      {/* Library */}
      <section className=" max-w-7xl mx-auto rounded-lg h-auto lg:h-96 my-5 px-6 py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center">
        <div>
          <img src={libraryImage} className="w-96 object-contain" />
        </div>
        <div>
          <h1 className="text-5xl  font-bold ">All Course Contents</h1>
          <p className="max-w-96 text-justify my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            ipsum eius minus velit sint accusamus accusantium ducimus ex
            eligendi deserunt?
          </p>
          <button className="border border-black rounded-full p-3 hover:bg-gray-200">
            Go to the library
          </button>
        </div>
      </section>
      {/* Final section */}
      <section className=" max-w-7xl mx-auto rounded-lg h-auto lg:h-72 my-5 px-6 py-6 lg:py-0 bg-[#252629] flex flex-col justify-center items-center">
        <h1 className="text-white font-bold text-5xl">Are You Ready?</h1>
        <p className="text-white my-5">
          Let UIU Pathshala your best study partner
        </p>
        <button className="border bg-white text-black rounded-full py-3 px-10 hover:bg-slate-300">
          Lets Study
        </button>
      </section>
    </main>
  );
};

export default Home;
