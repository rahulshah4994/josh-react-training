import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetails } from '../services/users.services';
import { User } from '../types/users.types';

const UserDetailsComponent = () => {
    const [userDetails, setUserDetails] = useState<User>()
   

    const params = useParams()
    const {id} = params

    const navigate = useNavigate()


    const goBackClicked = () => {
        navigate(-1)
    }

    useEffect(() => {
        fetchUserDetails(id).then((data) => setUserDetails(data))
    }, [id])
    return (
        <div>
            <button onClick={goBackClicked}>Back</button>
            <table>
                <tr>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
                <tr>
                    <td><img src={userDetails?.avatar} alt={userDetails?.first_name} /></td>
                    <td>{userDetails?.first_name}</td>
                    <td>{userDetails?.last_name}</td>
                    <td>{userDetails?.email}</td>
                </tr>
            </table>
        </div>
    );
};

export default UserDetailsComponent;