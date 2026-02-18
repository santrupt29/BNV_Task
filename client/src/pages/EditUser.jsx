import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUserById, updateUser } from '../services/api';
import { toast } from 'react-toastify';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUserById(id);
                setUser(data);
            } catch (error) {
                toast.error('Failed to fetch user details');
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            await updateUser(id, formData);
            toast.success('User updated successfully');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            {user ? (
                <UserForm initialData={user} onSubmit={handleUpdate} isEdit={true} />
            ) : (
                <div className="loading-spinner"></div>
            )}
        </div>
    );
};

export default EditUser;
