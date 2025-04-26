import { useState, useEffect, useContext } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import axios from "axios";

const Teaching = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const userContext = useContext(AuthContext); // Get the user object from the AuthContext
  const userEmail = userContext.user.email;

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await axios.get("https://server-uiu-pathshala.vercel.app/track/tracks");
        setTracks(res.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const handleSaveTrack = async () => {
    if (!title.trim() || !description.trim()) return;
    try {
      const payload = {
        title,
        description,
        email: userEmail,
      };
      const res = await axios.post("https://server-uiu-pathshala.vercel.app/track/", payload);
      // Append new track to list
      setTracks((prev) => [...prev, res.data.track]);
      setShowModal(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating track:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-450px)] flex">
      <div className="max-w-6xl mx-auto p-6 flex-grow">
        {/* Search Bar */}
        <div className="flex items-center mb-6 bg-[#ff6c26] p-2 rounded-lg shadow-md">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search your Tracks..."
              className="w-full pl-10 pr-12 py-2 bg-transparent text-white placeholder-white border-none focus:outline-none"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-2 bg-white text-[#ff6c26] p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <FaPlus />
          </button>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-450px)]">
            <div className="loader animate-spin rounded-full h-32 w-32 border-t-8 border-orange-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <Link to={`/tutor/edit-track/${track._id}`} key={track._id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-orange-200 cursor-pointer">
                  {console.log(track)}
                  <img
                    src={banner}
                    alt="Track Banner"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-orange-600">
                      {track.title}
                    </h3>
                    <p className="text-gray-700 mt-2">{track.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Created by: {track.owner}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating a new track */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-2xl font-bold mb-4">Create New Track</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
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
                onClick={handleSaveTrack}
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

export default Teaching;
