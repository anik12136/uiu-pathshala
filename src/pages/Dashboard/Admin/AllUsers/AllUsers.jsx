import React from 'react';
import useAllUser from '../../../../Hooks/useAllUser';

const AllUsers = () => {
    const { allUsers, loading, error } = useAllUser();
    return (
        <div className='p-4'>
            <div className='flex justify-between'>
                <h2 className='font-bold text-black mb-5 '>All Users</h2>
                <h2><input className='rounded-lg w-96 h-10 bg-white text-balance px-5 border-orange-400 border-2' type="text" placeholder='search...'/></h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className=' '>
                               
                                <th>SL</th>
                                <th>User info</th>
                                <th>Details</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allUsers?.map((user, index) => (
                                <tr className=' '  key ={index}s>
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
                                    <td className=' text-center'>
                                        <button className='border-2 px-2 py-1 rounded-full me-2' >Warning</button> 
                                        <button className='border-2 px-2 py-1 rounded-full'>Delete</button>
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
