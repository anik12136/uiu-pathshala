import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import LibraryContents from "../shared/LibraryContents/LibraryContents";
import useLibraryContentsData from "../../Hooks/useLibraryContentsData";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";

const Books = () => {
  const subjects = useLibraryContentsData();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Store modal message
  const [modalType, setModalType] = useState(""); // Store modal type ('success' or 'error')

  const handleBookmark = async (subject) => {
    if (!user) {
      toast.error("You need to be logged in to bookmark.");
      return;
    }

    const bookmarkData = {
      createBy: user.email,
      type: "books",
      courseName: subject.courseName,
    };

    try {
      const response = await fetch(
        "http://localhost:7000/BookMark/addBookmark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmarkData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Bookmark added successfully!", {
          duration: 3000,
          position: "top-right",
        });
        setModalMessage(data.message || "Bookmark added successfully!");
        setModalType("success"); // Success type for modal
        setIsModalOpen(true); // Open modal on success
      } else if (response.status === 409) {
        // Handle 409 Conflict - Bookmark already exists
        toast.error(data.message || "This bookmark already exists.", {
          duration: 3000,
          position: "top-right",
        });
        setModalMessage(data.message || "This bookmark already exists.");
        setModalType("error"); // Error type for modal
        setIsModalOpen(true); // Open modal on conflict
      } else {
        toast.error(data.message || "An error occurred.", {
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      toast.error("Error adding bookmark.", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Books</h1>
      <div className="relative my-4">
        <IoSearch className="text-2xl absolute top-2 left-3 text-gray-500" />
        <input
          type="text"
          name="bookSearchField"
          placeholder="Search by course name or course code"
          className="border ps-10 pr-4 py-2 w-full lg:w-1/4 rounded-full focus:outline-none shadow-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="relative border rounded-lg p-4 shadow-md bg-white">
            <LibraryContents subject={subject} routeName={"books"} />
            <button
              onClick={() => handleBookmark(subject)}
              className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-blue-500 transition">
              {subject.bookmarked ? (
                <FaBookmark className="text-xl text-blue-700" />
              ) : (
                <FaRegBookmark className="text-xl text-gray-700" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-white rounded-lg p-6 w-1/3 shadow-lg ${
              modalType === "error"
                ? "border border-red-500"
                : "border border-green-500"
            }`}>
            <h2 className="text-xl font-bold text-center mb-4">
              {modalType === "error" ? "Error" : "Success"}
            </h2>
            <div className="flex justify-center mb-4">
              <div
                className={`text-4xl ${
                  modalType === "error" ? "text-red-500" : "text-green-500"
                }`}>
                {modalType === "error" ? "❌" : "✔️"}
              </div>
            </div>
            <p className="text-center mb-4">{modalMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
