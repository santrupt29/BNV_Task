import React from 'react';
import UserForm from '../components/UserForm';
import { registerUser } from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
    const handleRegister = async (formData) => {
        try {
            await registerUser(formData);
            toast.success('User registered successfully');
        } catch (error) {
            throw error; // Let the form handle the error display
        }
    };

    return (
        <div>
            <UserForm onSubmit={handleRegister} />
        </div>
    );
};

export default Register;
