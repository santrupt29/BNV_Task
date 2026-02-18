import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser, exportUsers } from '../services/api';
import { toast } from 'react-toastify';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await getUsers(page, 5, search);
            setUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        style={{ width: '300px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/register" className="btn btn-primary">+ Add User</Link>
                    <button onClick={exportUsers} className="btn btn-success">Export To Csv</button>
                </div>
            </div>

            <div className="card table-container">
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1 + (page - 1) * 5}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender === 'M' ? 'Male' : 'Female'}</td>
                                    <td>
                                        <span className={`badge ${user.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <img
                                            src={user.profile ? `${import.meta.env.VITE_BACKEND_API_URL}/uploads/${user.profile}` : 'https://via.placeholder.com/40'}
                                            alt="Profile"
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setShowMenu(showMenu === user._id ? null : user._id)}
                                            style={{ background: 'none', border: 'none', fontSize: '1.2rem' }}
                                        >
                                            &#8942;
                                        </button>

                                        {showMenu === user._id && (
                                            <div style={{
                                                position: 'absolute',
                                                right: '100%',
                                                top: '0',
                                                background: 'white',
                                                boxShadow: 'var(--shadow)',
                                                borderRadius: 'var(--radius)',
                                                zIndex: 10,
                                                minWidth: '120px',
                                                overflow: 'hidden'
                                            }}>
                                                <Link
                                                    to={`/view/${user._id}`}
                                                    style={{ display: 'block', padding: '10px', color: 'var(--success-color)' }}
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/edit/${user._id}`}
                                                    style={{ display: 'block', padding: '10px', color: 'var(--primary-color)' }}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px', color: 'var(--danger-color)', background: 'none', border: 'none' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                    className="btn"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    &lt; Previous
                </button>
                <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
                <button
                    className="btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

export default UserTable;
