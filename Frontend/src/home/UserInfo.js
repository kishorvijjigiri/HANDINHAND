import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            const email = sessionStorage.getItem('email'); // Retrieve email from sessionStorage
            if (token && email) {
                try {
                    const response = await axios.get(`http://localhost:8080/userdetails/getByEmail/${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    alert('Failed to fetch user details. Please log in again.');
                }
            } else {
                alert('You are not logged in. Please log in to continue.');
            }
        };
        fetchUserDetails();
    }, []);

    if (!userDetails) {
        return <p>Loading user details...</p>;
    }

    return (
        <div>
            <h2>Welcome, {userDetails.fullName}</h2>
            <p>Email: {userDetails.email}</p>
            <p>Mobile Number: {userDetails.mobileNo}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

export default UserInfo;
