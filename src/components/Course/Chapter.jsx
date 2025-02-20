import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import VideoUploadModal from "./VideoUploadModal";
import EditModal from "./EditModal";
import ConfirmationModal from "./ConfirmationModal";

const Chapter = ({ chapter, courseId, onSaveField, onDeleteChapter, onDeleteVideo, refresh }) => {
  const [editingField, setEditingField] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [initialValue, setInitialValue] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState({ type: null, id: null });

  const handleEdit = (field, video = null) => {
    setEditingField(field);
    setEditingVideo(video);
    setInitialValue(video ? video[field] : chapter[field]);
  };

  const handleSave = (value) => {
    if (onSaveField) {
      const target = editingVideo
        ? { courseId, chapterId: chapter._id, videoId: editingVideo._id }
        : { courseId, chapterId: chapter._id };
      onSaveField(
        editingVideo ? "video" : "chapter",
        target,
        editingField,
        value
      );
      setEditingField(null);
      setEditingVideo(null);
    }
  };

  const openConfirmation = (type, id) => {
    setShowConfirmation({ type, id });
  };

  const closeConfirmation = () => {
    setShowConfirmation({ type: null, id: null });
  };

  const confirmDelete = () => {
    if (showConfirmation.type === "chapter") {
      onDeleteChapter(courseId, chapter._id);
    } else if (showConfirmation.type === "video") {
      onDeleteVideo(courseId, chapter._id, showConfirmation.id);
    }
    closeConfirmation();
  };

  const closeModal = () => {
    setShowUploadModal(false);
  };

  return (
    <div className="p-6 bg-orange-100 shadow-md rounded-lg mb-6">
      {/* Chapter Header */}
      <div className="flex items-center justify-between mb-4 py-6 border-b-2 border-blue-900">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">{chapter.title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => handleEdit("title")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-blue-600"
            onClick={() => setShowUploadModal(true)}
          >
            <FaPlus />
            <span>Video</span>
          </button>
          {/* <button
            className="text-red-500 hover:text-red-700"
            onClick={() => openConfirmation("chapter", chapter._id)}
          >
            <FaTrash />
          </button> */}
        </div>
      </div>

      {/* Chapter Description */}
      <div className="flex items-center space-x-2 mb-4">
        <p className="text-gray-600">{chapter.description || "No description available."}</p>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => handleEdit("description")}
        >
          <FaEdit />
        </button>
      </div>

      {/* Videos Section */}
      <div className="space-y-6">
        {chapter.videos && chapter.videos.length > 0 ? (
          chapter.videos.map((video, index) => (
            <div
              key={video._id}
              className="flex flex-col md:flex-row items-start md:items-center border border-gray-300 rounded-lg p-4 mb-4  bg-slate-100"
            >
              {/* Video Player */}
              <video
                controls
                className="md:w-1/3 w-full rounded mb-4 md:mb-0 md:mr-4"
                src={`http://localhost:7000/uploads/${video.filename}`}
              />
              {/* Video Details */}
              <div className="flex-1 self-start">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">
                    Video {index + 1}: {video.title || "Untitled Video"}
                  </h3>
                  {/* <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openConfirmation("video", video._id)}
                  >
                    <FaTrash />
                  </button> */}
                </div>
                <div className="mt-2">
                  <p className="text-gray-600">
                    <strong>Description:</strong> {video.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No videos added yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingField && (
        <EditModal
          field={editingField}
          initialValue={initialValue}
          onSave={handleSave}
          onClose={() => {
            setEditingField(null);
            setEditingVideo(null);
          }}
        />
      )}

      {/* Video Upload Modal */}
      {showUploadModal && (
        <VideoUploadModal
          courseId={courseId}
          chapterId={chapter._id}
          onClose={ () => {
            refresh();
            closeModal();
          }

          }
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmation.type && (
        <ConfirmationModal
          message={`Are you sure you want to delete this ${showConfirmation.type}?`}
          onConfirm={confirmDelete}
          onCancel={closeConfirmation}
        />
      )}
    </div>
  );
};

export default Chapter;
