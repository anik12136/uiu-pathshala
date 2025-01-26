import React from 'react';
import useAllUser from '../../../../Hooks/useAllUser';

const AllUsers = () => {
    const { allUsers, loading, error } = useAllUser();
    return (
        <div>
            <h2>All Users</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                               
                                <th>SL</th>
                                <th>User info</th>
                                <th>Details</th>
                                <th>operation</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allUsers?.map((user, index) => (
                                <tr className=''  key ={index}s>
                                    <th>
                                        <label>
                                            <p>{index+1}</p>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
                                                        alt=" " />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50">{user?.id || "0111000000"}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                   
                                    <td><button>Details..</button></td>
                                    <td>
                                        <button>Warning</button>
                                        <button>Delete</button>
                                    </td>
                                    
                                </tr>
                            ))}

                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;

{/* row 1 */ }
