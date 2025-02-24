import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAllUser from "../../../../Hooks/useAllUser";
import { Commet } from "react-loading-indicators";

const AllUsers = () => {
  const { allUsers, loading, error } = useAllUser();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store search results

  // Show all users initially and update as searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(allUsers); // Show all users if search field is empty
    } else {
      const result = allUsers.filter((user) =>
        user.studentID?.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search by ID
      );
      setFilteredUsers(result);
    }
  }, [searchQuery, allUsers]);

  if (loading) {
    return <div className="flex justify-center items-center"><Commet color="#cc7731" size="large" text="" textColor="#NaNNaNNaN" /></div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500 font-semibold">Error: {error.message}</div>;
  }

  return (
    <div className="p-6  shadow-lg rounded-lg">
      {/* Header with Search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Users <span className="text-orange-500">({filteredUsers?.length})</span>
        </h2>
        <input
          type="text"
          placeholder="Enter Student ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 h-10 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-orange-600 text-white text-left">
              <th className="p-4 font-medium"></th>
              <th className="p-4 font-medium">User Info</th>
              <th className="p-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">{user.name}</div>
                      {
                        user?.role == "admin" ? <></>
                          : <div className="text-sm text-gray-500">{user?.studentID || "ID: 0000000000"}</div>

                      }
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/dashboard/user_details/${user._id}`}
                      className="px-5 py-2 text-black rounded-full hover:bg-orange-600 transition shadow-md"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>))
            ) : (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No users found with this Student ID
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
