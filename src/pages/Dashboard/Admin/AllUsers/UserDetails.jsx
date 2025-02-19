import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Commet } from 'react-loading-indicators';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);

    console.log(user);
    // Fetch user data on mount
    useEffect(() => {
        fetch(`http://localhost:7000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    // =========================== MUTATION FUNCTIONS ===========================

    // Mutation: Issue warning
    const issueWarningMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.put(`http://localhost:7000/users/${id}`, { warning: 'warning' });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user', id]); // Invalidate query to refresh data
            setUser((prev) => ({ ...prev, warning: 'warning' }));
            alert(`Warning issued to ${user?.name}`);
        },
        onError: (error) => {
            console.error('Error issuing warning:', error);
            alert('Failed to issue warning.');
        },
    });

    // Mutation: Remove warning
    const removeWarningMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.put(`http://localhost:7000/users/${id}`, { warning: 'none' });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user', id]); // Invalidate query to refresh data
            setUser((prev) => ({ ...prev, warning: 'none' }));
            alert(`Warning removed for ${user?.name}`);
        },
        onError: (error) => {
            console.error('Error removing warning:', error);
            alert('Failed to remove warning.');
        },
    });

    // =========================== EVENT HANDLERS ===========================

    // Handle issuing warning
    const handleWarning = () => {
        const confirmWarning = window.confirm(`Are you sure you want to issue a warning to ${user?.name}?`);
        if (confirmWarning) {
            issueWarningMutation.mutate();
        }
    };

    // Handle removing warning
    const handleRemoveWarning = () => {
        const confirmRemove = window.confirm(`Are you sure you want to remove the warning for ${user?.name}?`);
        if (confirmRemove) {
            removeWarningMutation.mutate();
        }
    };


    // Handle user deletion
    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        fetch(`http://localhost:7000/users/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    alert('User deleted successfully');
                    navigate('/dashboard');
                } else {
                    alert('Failed to delete user');
                }
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    // =========================== RENDER UI ===========================
    if (!user) return <Commet color="#cc7731" size="large" text="" textColor="#NaNNaNNaN" />;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">User Details</h2>

            <div className="flex items-center space-x-4 mb-4">
                <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full border" />
                <div className="text-gray-700">
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                </div>
            </div>

            <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Student ID:</strong> {user.studentID}</p>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Rating:</strong> {user.rating} / 5</p>
                <p><strong>Warning Status:</strong> <span className={user.warning === 'warning' ? "text-red-500" : "text-green-500"}>{user.warning === 'warning' ? 'Warning Issued' : 'No Warnings'}</span></p>
            </div>

            <div className='mt-6 flex space-x-3'>
                {user?.warning === 'warning' ? (
                    <button
                        className='px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50'
                        onClick={handleRemoveWarning}
                        disabled={removeWarningMutation.isLoading}
                    >
                        {removeWarningMutation.isLoading ? 'Removing...' : 'Remove Warning'}
                    </button>
                ) : (
                    <button
                        className='px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition disabled:opacity-50'
                        onClick={handleWarning}
                        disabled={issueWarningMutation.isLoading}
                    >
                        {issueWarningMutation.isLoading ? 'Issuing...' : 'Issue Warning'}
                    </button>
                )}

                <button
                    className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserDetails;



// Warning to user
// const handleWarning = () => {
//     const confirmWarning = window.confirm(`Are you sure you want to issue a warning to ${user?.name}?`);
//     if (!confirmWarning) return;

//     fetch(`http://localhost:7000/users/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ warning: 'warning' })
//     })
//         .then(res => res.json())
//         .then(data => alert(`Warning issued to ${user?.name}`))
//         .catch(error => console.error('Error issuing warning:', error));
// };
