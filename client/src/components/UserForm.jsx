import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        status: 'Active',
        location: '',
        profile: null
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData({
                ...initialData,
                profile: null // Reset profile file input on edit, keep URL separated if needed
            });
            if (initialData.profile) {
                // Assuming backend serves images from /uploads
                setPreview(`${import.meta.env.VITE_BACKEND_API_URL}/uploads/${initialData.profile}`);
            }
        }
    }, [initialData, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profile: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        if (!formData.firstName || !formData.lastName) {
            toast.error('Name fields are required');
            return false;
        }
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            toast.error('Valid email is required');
            return false;
        }
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
            toast.error('Valid 10-digit mobile number is required');
            return false;
        }
        if (!formData.gender) {
            toast.error('Gender is required');
            return false;
        }
        if (!formData.location) {
            toast.error('Location is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            await onSubmit(data);
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                {isEdit ? 'Edit User Details' : 'Register Your Details'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter FirstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter LastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            className="form-control"
                            placeholder="Enter Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength="10"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Select Your Gender</label>
                        <div style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={formData.gender === 'M'}
                                    onChange={handleChange}
                                /> Male
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={formData.gender === 'F'}
                                    onChange={handleChange}
                                /> Female
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Select Your Status</label>
                        <select
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="InActive">InActive</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Select Your Profile</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Profile Preview"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginTop: '10px', objectFit: 'cover' }}
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Enter Your Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Enter Your Location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '20px', padding: '12px' }}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
