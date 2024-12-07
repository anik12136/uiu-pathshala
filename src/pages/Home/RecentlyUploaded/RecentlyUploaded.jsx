import { FaStar } from "react-icons/fa";
import defaultCourseBanner from "../../../../src/assets/images/intro-data-structure-–-1.png";
import defaultImage from "../../../../src/assets/images/pylyp-sukhenko-SrsIBiJPpxs-unsplash.webp";
const RecentlyUploaded = ({ course }) => {
  console.log(course);

  return (
    <div className=" border flex flex-col gap-2 p-4 bg-white text-gray-500 rounded-lg shadow-lg cursor-pointer">
      <img
        src={defaultCourseBanner}
        className="w-full rounded-lg object-contain"
        alt=""
      />
      <h1 className="">{course.title}</h1>
      <p className="font-semibold">{course.subject}</p>
      <div className="flex gap-2 ">
        <img src={defaultImage} className="w-7 h-7 object-cover rounded-full" />
        <h1>{course.name}</h1>
      </div>
      <p className="flex gap-2">
        <FaStar className="inline" />
        4/5 {"("}
        {course.ratings}
        {")"}
      </p>
    </div>
  );
};

export default RecentlyUploaded;
