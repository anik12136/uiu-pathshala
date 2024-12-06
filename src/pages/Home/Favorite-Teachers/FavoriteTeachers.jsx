import { FaStar } from "react-icons/fa";
import defaultImage from "../../../../src/assets/images/pylyp-sukhenko-SrsIBiJPpxs-unsplash.webp";
const FavoriteTeachers = ({ teacher }) => {
  console.log("From individual teacher", teacher);
  return (
    <div className="w-40 h-40 border flex flex-col gap-2 p-4 justify-center items-center bg-white text-gray-500 rounded-lg shadow-lg cursor-pointer">
      <img src={defaultImage} className="w-14 h-14 object-cover rounded-full" />
      <h1>{teacher.name}</h1>
      <p className="flex justify-center items-center gap-2">
        <FaStar className="inline" />
        4/5 {"("}
        {teacher.ratings}
        {")"}
      </p>
    </div>
  );
};

export default FavoriteTeachers;
