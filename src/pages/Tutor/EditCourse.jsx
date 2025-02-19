import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BannerTitleDescription from "../../components/Course/BannerTitleDescription";
import Loader from "../../components/Course/Loader";
import Chapter from "../../components/Course/Chapter";


const EditCourse = () => {
  const { courseId } = useParams(); // Get course ID from route params
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Page loader
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [newChapter, setNewChapter] = useState({ title: "", description: "" });
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    file: null,
  });

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/courses/${courseId}`
      );
      
      setCourse(response.data);
    } catch (error) {
      console.error("Error loading course details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch course details
  useEffect(() => {
    fetchCourseDetails();
  }, [loading]);


  const refreshCourse = async () => {
    // setLoading(true);
    fetchCourseDetails();
  }; // Refresh course details after editing

  // Handle editing a field
  const handleEdit = (field) => {
    setEditingField(field);
    setEditedValue(course[field] || "");
  };

  const saveField = async (entityType, ids, field, value) => {
    try {
      let apiUrl;
      setLoading(true);

      // Construct API URL based on entity type
      switch (entityType) {
        case "course":
          apiUrl = `http://localhost:7000/api/courses/${ids.courseId}/${field}`;
          break;
        case "chapter":
          apiUrl = `http://localhost:7000/api/courses/${ids.courseId}/chapters/${ids.chapterId}/${field}`;
          break;
        case "video":
          apiUrl = `http://localhost:7000/api/courses/${ids.courseId}/videos/${ids.videoId}/${field}`;
          break;
        default:
          throw new Error("Invalid entity type");
      }

      // Make the API request with Axios
      const response = await axios.put(apiUrl, {
        [field]: value,
      });

      if (response.status === 200) {
        console.log(`${field} updated successfully for ${entityType}`);
        setLoading(false);
      } else {
        throw new Error("Failed to update field");
      }
    } catch (error) {
      console.error("Error updating field:", error.message);
    }
  };

  const handleDelete = async (id, type, videoId = null) => {
    const endpoint =
      type === "chapter"
        ? `/api/courses/${courseId}/chapters/${id}`
        : `/api/courses/${courseId}/chapters/${id}/videos/${videoId}`;

    try {
      await axios.delete(`http://localhost:7000${endpoint}`);
      fetchCourseDetails();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddChapter = async () => {
    if (!newChapter.title.trim()) {
      alert("Chapter title cannot be blank.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:7000/api/courses/${courseId}/chapters`,
        newChapter
      );
      setNewChapter({ title: "", description: "" });
      setModalOpen(false);
      fetchCourseDetails();
    } catch (error) {
      console.error("Error adding chapter:", error);
    }
  };

  const handleAddVideo = async (chapterId) => {
    if (!newVideo.title.trim() || !newVideo.file) {
      alert("Please provide a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newVideo.title);
    formData.append("description", newVideo.description);
    formData.append("file", newVideo.file);

    try {
      setUploading(true);
      await axios.post(
        `http://localhost:7000/api/courses/${courseId}/chapters/${chapterId}/videos`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );
      setUploading(false);
      setNewVideo({ title: "", description: "", file: null });
      fetchCourseDetails();
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  

  

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Course Banner */}
      <BannerTitleDescription course={course} onSaveField={saveField} />

      {/* Chapters Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-6 m-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Chapters</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            Add Chapter
          </button>
        </div>
        {course.chapters && course.chapters.length > 0 ? (
          course.chapters.map((chapter) => (
            <Chapter
              key={chapter._id}
              courseId = {course._id}
              chapter={chapter}
              onSaveField={saveField}
              refresh={refreshCourse}
            />
          ))
        ) : (
          <p className="text-gray-500">No chapters added yet.</p>
        )}
      </div>

      {/* Add Chapter Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Add Chapter</h3>
            <input
              type="text"
              placeholder="Chapter Title"
              value={newChapter.title}
              onChange={(e) =>
                setNewChapter({ ...newChapter, title: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <textarea
              placeholder="Chapter Description"
              value={newChapter.description}
              onChange={(e) =>
                setNewChapter({ ...newChapter, description: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              rows="3"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddChapter}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
