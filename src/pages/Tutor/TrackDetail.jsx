import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
import banner from "../../assets/banner.jpg";

const TrackDetail = () => {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [entryTitle, setEntryTitle] = useState("");
  const [entryDescription, setEntryDescription] = useState("");
  const [file, setFile] = useState(null);

  const userContext = useContext(AuthContext); // Get the user object from the AuthContext
  const currentUserEmail = userContext.user.email;

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/track/tracks/${trackId}`
        );
        setTrack(res.data);
      } catch (error) {
        console.error("Error fetching track:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [trackId]);

  const handleSaveEntry = async () => {
    if (!entryTitle.trim() || !file) return;
    try {
      const formData = new FormData();
      formData.append("title", entryTitle);
      formData.append("description", entryDescription);
      formData.append("file", file);

      const res = await axios.post(
        `http://localhost:7000/track/tracks/${trackId}/entries`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Refresh the track data after adding entry
      const updated = await axios.get(
        `http://localhost:7000/track/tracks/${trackId}`
      );
      setTrack(updated.data);
      setShowModal(false);
      setEntryTitle("");
      setEntryDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-450px)]">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-8 border-orange-400"></div>
      </div>
    );
  if (!track) return <p>Track not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[calc(100vh-450px)]">
      <img
        src={banner}
        alt="Track Banner"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold text-orange-600">{track.title}</h1>
      <p className="text-gray-700 mt-2">{track.description}</p>
      <p className="text-sm text-gray-500 mt-2">Created by: {track.owner}</p>

      <hr className="my-8 border-t-2 border-gray-300" />

      {track.owner === currentUserEmail && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
        >
          <FaPlus /> Add Entry
        </button>
      )}

      {/* Track entries as vertical timeline */}
      <div className="mt-6 border-l-2 border-orange-300 pl-4">
        {track.entries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          track.entries.map((entry) => (
            <div key={entry._id} className="mb-6">
              {console.log(entry)}
              <p className="font-bold text-orange-600">{entry.title}</p>
              <p className="text-gray-700">{entry.description}</p>
              <a
                href={`http://localhost:7000/uploads/${entry.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {entry.filename}
              </a>
              <p className="text-sm text-gray-500">
                {new Date(entry.date).toLocaleString()}
              </p>
              {/* Optionally add a link/button to download/view the attachment */}
            </div>
          ))
        )}
      </div>

      {/* Modal for adding new entry */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Add New Entry</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Description</span>
              <textarea
                value={entryDescription}
                onChange={(e) => setEntryDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Attachment</span>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 block w-full"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEntry}
                className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
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

export default TrackDetail;
