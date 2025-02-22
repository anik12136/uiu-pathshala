import React, { useState, useContext } from "react";
import { BiSolidPencil } from "react-icons/bi";
import {
  FaFacebook,
  FaGithub,
  FaStar,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AuthContext } from "../../providers/AuthProviders";
import useUser from "../../Hooks/useUser";

const ProfileInfo = ({ label, value }) => (
  <div className="flex items-center space-x-4">
    <span className="font-semibold text-gray-800 text-lg">{label}:</span>
    <span className="text-gray-600 text-lg">{value}</span>
  </div>
);

const SocialMediaLink = ({ icon: Icon, username, url }) => (
  <div className="flex gap-4 my-4 justify-start items-center">
    <Icon className="text-gray-600 text-2xl" />
    <a
      href={url}
      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
      {username}
    </a>
  </div>
);

const ContributionCard = ({ image, title, duration, author, rating }) => (
  <div className="flex gap-3 border p-2 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <img
      className="w-52 h-28 rounded-lg object-cover"
      src={image}
      alt={title}
    />
    <div className="grow text-gray-700">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-500 text-sm my-1">Duration: {duration}</p>
      <p className="font-medium my-1">{author}</p>
      <div className="flex justify-start items-center gap-3">
        <FaStar className="text-yellow-500" />
        <span>({rating}/5)</span>
      </div>
    </div>
  </div>
);

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { dbUser, updateUserProfile } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: dbUser?.name || "",
    department: dbUser?.department || "",
    photoURL: dbUser?.photoURL || "",
    studentID: dbUser?.studentID || "",
    email: user.email
  });

  const interests = [
    "Data Science",
    "Machine Learning",
    "Web Programming",
    "Software Engineering",
    "Software Architecture",
    "DataStructure and Algorithm",
  ];

  const userName = dbUser?.name || "Not Set";
  const userDepartment = dbUser?.department || "Department Not Set";
  const userEmail = dbUser?.email || "Not Set";
  const userStudentID = dbUser?.studentID || "Student ID Not Set";
  const userPhotoURL = dbUser?.photoURL || "https://via.placeholder.com/150";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const result = await updateUserProfile(updatedUser);
    if (result.success) {
      alert("Profile updated successfully");
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto space-y-4">
      {/* Profile Header Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-48 lg:h-96">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1739560116869-84714fa15b3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile cover"
          />
        </div>

        <div className="px-4 lg:px-6 pb-6 lg:pb-9 relative">
          <img
            className="w-28 lg:w-44 h-28 lg:h-44 rounded-full object-cover absolute -top-14 lg:-top-20 border-4 border-white shadow-lg"
            src={userPhotoURL}
            alt={`${userName}'s profile`}
          />

          <div className="ml-32 lg:ml-52 pt-4 lg:pt-6">
            <div className="flex justify-between items-start">
              <h1 className="font-extrabold text-3xl lg:text-4xl text-gray-900">
                {userName}
              </h1>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg shadow-md transition-colors">
                <BiSolidPencil className="text-lg lg:text-xl" />
                <span className="hidden lg:inline">Edit profile</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <ProfileInfo label="Department" value={userDepartment} />
              <ProfileInfo label="Email" value={userEmail} />
              <ProfileInfo label="Student ID" value={userStudentID} />
              <ProfileInfo
                label="University"
                value="United International University"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-2xl text-gray-700 mb-4">About</h2>
        <p className="text-gray-600 text-justify">
          Hi there! I'm a passionate developer who thrives on solving complex
          problems through innovative coding solutions. With a keen interest in
          technologies like JavaScript, React, and Node.js, I enjoy building
          scalable applications that make a real impact. Whether it's a web app,
          mobile solution, or backend infrastructure, I'm always up for the
          challenge.
        </p>
        <p className="text-gray-600 text-justify mt-4">
          Beyond coding, I love diving into topics like AI, machine learning,
          and data science. I believe these fields have the potential to reshape
          the way we interact with the world around us, and I'm excited to be
          part of that change. When I'm not working, you can find me exploring
          new places, learning photography, or catching up on the latest tech
          news.
        </p>
        <p className="text-gray-600 text-justify mt-4">
          If you're interested in collaborating on projects, sharing knowledge,
          or just having a good conversation about tech, feel free to reach out!
          I'm always open to new opportunities and ideas that can help me grow
          and make meaningful contributions.
        </p>
      </section>

      {/* Interests Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-2xl text-gray-700 mb-4">Interests</h2>
        <div className="flex gap-4 flex-wrap">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="text-gray-700 border rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-2xl text-gray-700 mb-4">
          Social Media
        </h2>
        <SocialMediaLink
          icon={FaFacebook}
          username={userName}
          url="https://www.facebook.com/"
        />
        <SocialMediaLink
          icon={FaInstagram}
          username={userName}
          url="https://www.instagram.com/"
        />
        <SocialMediaLink
          icon={FaYoutube}
          username={userName}
          url="https://www.youtube.com/"
        />
        <SocialMediaLink
          icon={FaGithub}
          username={userName}
          url="https://github.com/"
        />
      </section>

      {/* Recent Contributions Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-2xl text-gray-700 mb-4">
          Recent Contributions
        </h2>
        <ContributionCard
          image="https://images.unsplash.com/photo-1553933899-131780ba04a3?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Machine learning for beginners"
          duration="4h"
          author={userName}
          rating="4"
        />
      </section>

      {/* Modal for Editing Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="department"
                value={updatedUser.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="photoURL"
                value={updatedUser.photoURL}
                onChange={handleChange}
                placeholder="Photo URL"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="studentID"
                value={updatedUser.studentID}
                onChange={handleChange}
                placeholder="Student ID"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-orange-500 text-white rounded-md">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
