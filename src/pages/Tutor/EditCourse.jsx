import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
// import "./CoursePage.css";

const CoursePage = () => {
  const { id: courseId } = useParams(); // Destructure 'id' from useParams
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [newChapter, setNewChapter] = useState({ title: "", description: "" });
  const [newVideo, setNewVideo] = useState({ title: "", description: "", file: null });

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleAddChapter = () => {
    const newChapterObj = {
      _id: Date.now().toString(), // Temporary ID for the front end
      title: newChapter.title,
      description: newChapter.description,
      videos: [],
    };

    setCourse({ ...course, chapters: [...course.chapters, newChapterObj] });
    setNewChapter({ title: "", description: "" });
    setShowChapterModal(false);
  };

  const handleAddVideo = () => {
    const updatedChapters = course.chapters.map((chapter) =>
      chapter._id === currentChapterId
        ? {
            ...chapter,
            videos: [
              ...chapter.videos,
              {
                _id: Date.now().toString(), // Temporary ID for the front end
                title: newVideo.title,
                description: newVideo.description,
                url: URL.createObjectURL(newVideo.file), // Temporary URL for front end
              },
            ],
          }
        : chapter
    );

    setCourse({ ...course, chapters: updatedChapters });
    setNewVideo({ title: "", description: "", file: null });
    setShowVideoModal(false);
  };

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (!course) {
    return <div>Error loading course details. Please try again.</div>;
  }

  return (
    <div className="course-page">
      <div className="course-banner">
        <img src={`/uploads/${course.bannerImage || "default-banner.png"}`} alt={course.title} />
      </div>
      <div className="course-details">
        <h1>{course.title || "Untitled Course"}</h1>
        <p>{course.description || "No description available."}</p>
        <button onClick={() => setShowChapterModal(true)} className="add-btn">
          Add Chapter
        </button>
      </div>
      <div className="course-chapters">
        {course.chapters && course.chapters.length === 0 ? (
          <p>No chapters added yet.</p>
        ) : (
          course.chapters.map((chapter) => (
            <div key={chapter._id} className="chapter">
              <h2>{chapter.title || "Untitled Chapter"}</h2>
              <p>{chapter.description || "No description available."}</p>
              {chapter.videos?.map((video) => (
                <video key={video._id} controls>
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
              <button
                onClick={() => {
                  setCurrentChapterId(chapter._id);
                  setShowVideoModal(true);
                }}
                className="add-btn"
              >
                Add Video
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showChapterModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Chapter</h2>
            <input
              type="text"
              placeholder="Title"
              value={newChapter.title}
              onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newChapter.description}
              onChange={(e) => setNewChapter({ ...newChapter, description: e.target.value })}
            />
            <button onClick={handleAddChapter} className="save-btn">
              Save Chapter
            </button>
            <button onClick={() => setShowChapterModal(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showVideoModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Video</h2>
            <input
              type="text"
              placeholder="Title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newVideo.description}
              onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            />
            <input type="file" onChange={(e) => setNewVideo({ ...newVideo, file: e.target.files[0] })} />
            <button onClick={handleAddVideo} className="save-btn">
              Save Video
            </button>
            <button onClick={() => setShowVideoModal(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
