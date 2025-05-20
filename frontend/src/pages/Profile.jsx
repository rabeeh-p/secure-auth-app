import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../Axios/axiosInstance';  

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
             
                const res = await api.get('/profile/'); 
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/'); 
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">Loading profile...</div>
            </>
        );
    }

    const createdDate = new Date(
        user.created_at || user.date_joined || user.createdDate
    ).toLocaleDateString();

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-10">
                        <div className="card shadow-sm p-4">
                            <h3 className="text-center mb-3">👤 User Profile</h3>
                            <div className="text-center mb-3">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.first_name || 'User'}&background=random&size=100`}
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="100"
                                    height="100"
                                />
                            </div>

                            <ul className="list-group mb-3">
                                <li className="list-group-item"><strong>First Name:</strong> {user.first_name || '-'}</li>
                                <li className="list-group-item"><strong>Last Name:</strong> {user.last_name || '-'}</li>
                                <li className="list-group-item"><strong>Username:</strong> {user.username || '-'}</li>
                                <li className="list-group-item"><strong>Email:</strong> {user.email || '-'}</li>
                                <li className="list-group-item"><strong>Created Date:</strong> {createdDate || '-'}</li>
                            </ul>
                            <div className="d-flex justify-content-between">
                                <button onClick={() => navigate('/editprofile')} className="btn btn-primary w-50 me-2">Edit Profile</button>
                                <button className="btn btn-danger w-50" onClick={() => {
                                    localStorage.clear();
                                    navigate('/');
                                }}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
