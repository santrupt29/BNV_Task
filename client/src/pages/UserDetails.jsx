import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById } from '../services/api';
import { toast } from 'react-toastify';

const UserDetails = () => {
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

    if (!user) return <div className="loading-spinner"></div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 20px',
                    border: '5px solid var(--background-color)',
                    boxShadow: 'var(--shadow)'
                }}>
                    <img
                        src={user.profile ? `${import.meta.env.VITE_BACKEND_API_URL}/uploads/${user.profile}` : 'https://via.placeholder.com/150'}
                        alt={`${user.firstName} ${user.lastName}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                    {user.firstName} {user.lastName}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>
                    {user.email}
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    textAlign: 'left',
                    background: 'var(--background-color)',
                    padding: '20px',
                    borderRadius: 'var(--radius)',
                    marginTop: '20px'
                }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Mobile</span>
                        <span style={{ fontWeight: '600' }}>{user.mobile}</span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Gender</span>
                        <span style={{ fontWeight: '600' }}>{user.gender === 'M' ? 'Male' : 'Female'}</span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Status</span>
                        <span className={`badge ${user.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                            {user.status}
                        </span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Location</span>
                        <span style={{ fontWeight: '600' }}>{user.location}</span>
                    </div>
                </div>

                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Link to={`/edit/${user._id}`} className="btn btn-primary">Edit Details</Link>
                    <Link to="/" className="btn" style={{ background: 'var(--background-color)' }}>Back to List</Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
