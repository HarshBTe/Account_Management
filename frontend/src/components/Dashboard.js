import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('https://account-management-backend-l5un.onrender.com/api/users/me', {
          headers: {
            Authorization: token,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.username}</h1>
      <p className="dashboard-role">Role: {user.role}</p>
    </div>
  );
}

export default Dashboard;
