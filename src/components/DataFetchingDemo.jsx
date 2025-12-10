// File: src/components/DataFetchingDemo.jsx
import React, { useState, useEffect } from 'react';

const DataFetchingDemo = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(1);
    const [userDetail, setUserDetail] = useState(null);

    // Effect untuk fetching semua users (sekali saat mount)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulasi API call dengan timeout
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Data dummy users
                const dummyUsers = [
                    { id: 1, name: 'Nezza', email: 'Nezza@example.com' },
                    { id: 2, name: 'Anggraini', email: 'Anggraini@example.com' },
                    { id: 3, name: 'Yolandari', email: 'Yolandari@example.com' },
                    { id: 4, name: 'Harry', email: 'Harry@example.com' }
                ];

                setUsers(dummyUsers);
            } catch (err) {
                setError('Gagal memuat data users');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Empty dependencies - hanya sekali saat mount

    // Effect untuk fetching user detail berdasarkan userId
    useEffect(() => {
        const fetchUserDetail = async () => {
            if (!userId) return;

            try {
                setLoading(true);

                // Simulasi API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Cari user berdasarkan userId dari data users
                const selectedUser = users.find(user => user.id === userId);
                
                if (selectedUser) {
                    // Data dummy user detail berdasarkan user yang dipilih
                    const dummyUserDetail = {
                        id: selectedUser.id,
                        name: selectedUser.name,
                        email: selectedUser.email,
                        phone: `+62 812-3456-78${selectedUser.id}`,
                        address: `Jl. ${selectedUser.name} No. ${selectedUser.id}, Jakarta`
                    };
                    setUserDetail(dummyUserDetail);
                }
            } catch (err) {
                setError(`Gagal memuat detail user ${userId}`);
                console.error('Error fetching user detail:', err);
            } finally {
                setLoading(false);
            }
        };

        // Hanya fetch detail jika users sudah terload
        if (users.length > 0) {
            fetchUserDetail();
        }
    }, [userId, users]); // Dependency: userId dan users - re-fetch ketika userId atau users berubah

    const handleUserChange = (event) => {
        setUserId(parseInt(event.target.value));
    };

    return (
        <div className="data-fetching-demo">
            <h2>Demo Data Fetching dengan useEffect</h2>

            {/* Loading State */}
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Memuat data...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {/* Users List */}
            <div className="users-section">
                <h3>Daftar Users</h3>
                <div className="users-grid">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className={`user-card ${userId === user.id ? 'active' : ''}`}
                        >
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Detail */}
            <div className="user-detail-section">
                <h3>Detail User</h3>

                <div className="user-selector">
                    <label>Pilih User ID: </label>
                    <select value={userId} onChange={handleUserChange}>
                        {[1, 2, 3, 4].map(id => (
                            <option key={id} value={id}>
                                User {id}
                            </option>
                        ))}
                    </select>
                </div>

                {userDetail && (
                    <div className="user-detail-card">
                        <h4>{userDetail.name}</h4>
                        <p><strong>Email:</strong> {userDetail.email}</p>
                        <p><strong>Phone:</strong> {userDetail.phone}</p>
                        <p><strong>Address:</strong> {userDetail.address}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataFetchingDemo;