import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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

    // ===========================[ MUTATION FUNCTIONS ]===========================

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

    // ===========================[ EVENT HANDLERS ]===========================

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

    // ===========================[ RENDER UI ]===========================
    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>

            <div className='mt-4'>
                {user?.warning === 'warning' ? (
                    <button
                        className='border-2 px-2 py-1 rounded-full me-2 bg-green-500 text-white'
                        onClick={handleRemoveWarning}
                        disabled={removeWarningMutation.isLoading}
                    >
                        {removeWarningMutation.isLoading ? 'Removing...' : 'Remove Warning'}
                    </button>
                ) : (
                    <button
                        className='border-2 px-2 py-1 rounded-full me-2 bg-yellow-500 text-white'
                        onClick={handleWarning}
                        disabled={issueWarningMutation.isLoading}
                    >
                        {issueWarningMutation.isLoading ? 'Issuing...' : 'Issue Warning'}
                    </button>
                )}

                <button
                    className='border-2 px-2 py-1 rounded-full bg-red-600 text-white'
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
