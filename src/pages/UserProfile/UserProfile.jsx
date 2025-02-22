import React, { useContext } from "react";
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
  const { dbUser } = useUser();

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
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg shadow-md transition-colors"
                aria-label={user ? "Edit profile" : "Add friend"}>
                {user ? (
                  <>
                    <BiSolidPencil className="text-lg lg:text-xl" />
                    <span className="hidden lg:inline">Edit profile</span>
                  </>
                ) : (
                  <>
                    <IoPersonAddSharp className="text-lg lg:text-xl" />
                    <span className="hidden lg:inline">Add friend</span>
                  </>
                )}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae
          placeat fugit, amet accusamus distinctio maxime quia animi maiores
          sunt quos dignissimos aperiam sed aliquid modi consequatur ab itaque
          sequi in nulla deserunt. Recusandae, deserunt illum. Sunt nisi
          exercitationem ex iste numquam animi cumque facilis ducimus sint optio
          tempora harum, consectetur veritatis id, possimus dolorem suscipit!
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
    </div>
  );
};

export default UserProfile;
