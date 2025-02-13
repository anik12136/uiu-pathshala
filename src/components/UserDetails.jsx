import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams(); // Access the dynamic `id` from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details based on `id`
    const fetchUser = async () => {
      try {
        const response = await fetch(`/users/${id}`); // Replace with your API endpoint
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Details</h1>
      <div className="mt-4">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <img src={user.photoURL} alt="User Avatar" className="mt-4 w-24 h-24 rounded-full" />
      </div>
    </div>
  );
};

export default UserDetails;
