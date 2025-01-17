import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserDetailPage = () => {
    const { users } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const user = users.find((u) => u.id === parseInt(id));

    if (!user) return <p>User not found!</p>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Company: {user.company.name}</p>
            <p>Website: {user.website}</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default UserDetailPage;
