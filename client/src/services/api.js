import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/users`;

export const getUsers = async (page = 1, limit = 5, search = '') => {
    return await axios.get(`${API_URL}?page=${page}&limit=${limit}&search=${search}`);
};

export const getUserById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const registerUser = async (formData) => {
    return await axios.post(`${API_URL}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const updateUser = async (id, formData) => {
    return await axios.put(`${API_URL}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const exportUsers = () => {
    window.location.href = `${API_URL}/export`;
};
