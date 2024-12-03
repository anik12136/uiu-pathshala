import { useEffect, useState } from "react";
import Banner from "../shared/Banner/Banner";
import FavoriteTeachers from "./Favorite-Teachers/FavoriteTeachers";
import { MdArrowForwardIos } from "react-icons/md";
import RecentlyUploaded from "./RecentlyUploaded/RecentlyUploaded";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch("../../../public/fakeDB/top-rated-tutors.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  return (
    <main className="mt-16">
      <Banner />
      <section className="h-[300px] max-w-7xl mx-auto my-4 rounded-lg bg-[#FFD460]">
        <h1 className="text-gray-600 text-4xl p-6">Your Favorite Teachers</h1>
        <div className="flex justify-center gap-5 flex-1">
          {teachers.map((teacher) => (
            <FavoriteTeachers
              key={teacher.id}
              teacher={teacher}
            ></FavoriteTeachers>
          ))}
          <div className="w-40 h-40 border flex flex-col gap-2 p-4 justify-center items-center bg-white text-gray-500 rounded-lg shadow-lg cursor-pointer">
            <span>View All</span>
            <MdArrowForwardIos className="text-2xl" />
          </div>
        </div>
      </section>
      <section className="h-auto max-w-7xl mx-auto my-6 rounded-lg ">
        <h1 className="text-gray-600 text-4xl p-6">Recently Uploaded</h1>
        <div className="flex justify-center gap-5 flex-1">
          {teachers.slice(0,4).map((course) => (
            <RecentlyUploaded
              key={course.id}
              course={course}
            ></RecentlyUploaded>
          ))}
        </div>
        <button className="cursor-pointer rounded-lg border w-36 p-3 flex justify-center items-center gap-2 border-orange-300 mt-2">View All <FaArrowRight /></button>
      </section>
      <section>
        
      </section>


    </main>
  );
};

export default Home;
