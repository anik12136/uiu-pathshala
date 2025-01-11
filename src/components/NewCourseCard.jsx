import { FaEdit, FaTrash } from "react-icons/fa";

const NewCourseCard = ({ course, onEdit, onDelete }) => {
  const isPublished = course.published;

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden">
      {/* Banner Image */}
        <img
          src={(course.bannerImage)? `http://localhost:7000/uploads/${course.bannerImage}` : "https://placehold.co/600x400"}
          alt={course?.title || "Course Banner"}
          className="w-full h-32 object-cover"
        />

      {/* Content */}
      <div className="p-4 flex flex-col bg-[#ff6c26] text-white h-48">
        <h3 className="font-semibold text-lg h-20">{course.title}</h3>
        <p className="text-sm mt-1">Lessons: {course.lessons}</p>
        <p className="text-xs text-neutral-300 mt-1">Created: {course.createdAt}</p>

        {/* Bottom Row */}
        <div className="flex justify-between items-center mt-4">
          {/* Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(course._id)}
              className="bg-white text-[#ff6c26] p-2 rounded-full hover:bg-orange-200"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(course._id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>

          {/* Published/Private Status */}
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              isPublished ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isPublished ? "Published" : "Private"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewCourseCard;
