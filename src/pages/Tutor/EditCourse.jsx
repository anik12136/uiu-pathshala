import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { courseId } = useParams(); // Get course ID from route params
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Page loader
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [newChapterTitle, setNewChapterTitle] = useState(""); // Chapter input state
  const [newChapterDescription, setNewChapterDescription] = useState(""); // Chapter description
  const [savingChapter, setSavingChapter] = useState(false); // Add chapter loader

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/courses/${courseId}`);
        console.log("Course details:", response.data);
        setCourse(response.data);
      } catch (error) {
        console.error("Error loading course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  // Add a new chapter
  const handleAddChapter = async () => {
    if (!newChapterTitle.trim() || !newChapterDescription.trim()) return; // Ensure both fields are filled

    setSavingChapter(true);
    try {
      await axios.post(`http://localhost:7000/api/courses/${courseId}/chapters`, { 
        title: newChapterTitle,
        description: newChapterDescription,
      });
      setNewChapterTitle(""); // Clear input
      setNewChapterDescription(""); // Clear input
      setModalOpen(false); // Close modal
      setLoading(true); // Show loader while reloading the course
      const response = await axios.get(`http://localhost:7000/api/courses/${courseId}`); // Reload course
      setCourse(response.data); // Update course data
    } catch (error) {
      console.error("Error adding chapter:", error);
    } finally {
      setSavingChapter(false);
      setLoading(false);
    }
  };


  


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-450px)] ">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-8 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-[calc(100vh-450px)] flex flex-col gap-6 justify-center ">
      
      {/* Course Details */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden grid-cols-1 border-2 border-slate-300 pb-8">
        <img
          src={ course.bannerImage? `http://localhost:7000/uploads/${course.bannerImage}` : "https://placehold.co/600x400"}
          alt={course.title}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{course.title || "Untitled Course"}</h1>
          <p className="text-gray-700 mt-2">{course.description || "No description provided."}</p>
          <p className="text-sm text-gray-500 mt-4">Creator: {course.creator || "Unknown"}</p>
          
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4 hover:bg-blue-600 justify-self-end"
          onClick={() => setModalOpen(true)}
        >
          Add Chapter
        </button>
      </div>

      {/* Chapters */}
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden grid-cols-1 border-2 border-slate-300 pb-8 col-span-full">
        <h2 className="text-2xl font-semibold mb-4 ">Chapters</h2>
        {course.chapters && course.chapters.length > 0 ? (
          course.chapters.map((chapter) => (
            <div key={chapter._id} className="p-4 bg-gray-100 rounded-lg mb-4">
              <h3 className="text-xl font-bold">{chapter.title || "Untitled Chapter"}</h3>
              <p className="text-gray-600">{chapter.description || "No description provided."}</p>
              <button className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600">
                Add Video
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No chapters added yet.</p>
        )}
      </div>

      {/* Add Chapter Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Chapter</h2>
            <input
              type="text"
              placeholder="Chapter Title"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              placeholder="Chapter Description"
              value={newChapterDescription}
              onChange={(e) => setNewChapterDescription(e.target.value)}
              className="w-full p-2 border rounded h-28 mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  savingChapter ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={handleAddChapter}
                disabled={savingChapter}
              >
                {savingChapter ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
