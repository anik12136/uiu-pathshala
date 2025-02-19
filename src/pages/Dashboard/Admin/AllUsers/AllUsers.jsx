import React from 'react';
import { Link } from 'react-router-dom';
import useAllUser from '../../../../Hooks/useAllUser';

const AllUsers = () => {
    const { allUsers, loading, error } = useAllUser();

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                    All Users <span className="text-orange-500">({allUsers?.length})</span>
                </h2>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-96 h-10 px-4 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="p-3 text-left">SL</th>
                            <th className="p-3 text-left">User Info</th>
                            <th className="p-3 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.map((user, index) => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border">
                                        <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-700">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user?.id || "0111000000"}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <Link to={`/dashboard/user_details/${user._id}`} className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600">
                                        Details...
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;