import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token'); // burada içində alırsan
            try {
                const res = await axios.get('http://localhost:2000/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error('İstifadəçilər alınmadı:', err.message);
            }
        };

        fetchUsers();
    }, [refresh]);

    const toggleBan = async (userId, isBanned) => {
        const token = localStorage.getItem('token'); // burda içində
        const url = isBanned
            ? `http://localhost:2000/api/admin/users/${userId}/unban`
            : `http://localhost:2000/api/admin/users/${userId}/ban`;

        try {
            await axios.patch(url, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRefresh((prev) => !prev);
            alert(isBanned ? 'İstifadəçi aktivləşdirildi' : 'İstifadəçi ban olundu');
        } catch (err) {
            console.error('Ban error:', err.response?.data);
            alert('Əməliyyat zamanı xəta baş verdi');
        }
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem('token'); // burda da içində
        if (!window.confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) return;
        try {
            await axios.delete(`http://localhost:2000/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRefresh(prev => !prev);
            alert('İstifadəçi silindi');
        } catch (err) {
            console.error('Silinmə xətası:', err);
            alert('Silinmə zamanı xəta baş verdi');
        }
    };

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">👥 İstifadəçilər</h1>

            <input
                type="text"
                placeholder="Axtarış (ad və ya email)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded w-full sm:w-1/2"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-sm sm:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-3 py-2 text-left">Ad</th>
                            <th className="px-3 py-2 text-left">Email</th>
                            <th className="px-3 py-2 text-left">Rol</th>
                            <th className="px-3 py-2 text-left">Status</th>
                            <th className="px-3 py-2 text-center">Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="px-3 py-2">{user.username}</td>
                                <td className="px-3 py-2">{user.email}</td>
                                <td className="px-3 py-2 capitalize">{user.role}</td>
                                <td className="px-3 py-2">
                                    {user.isBanned ? '🚫 Banlı' : '✅ Aktiv'}
                                </td>
                                <td className="px-3 py-2 flex flex-col sm:flex-row justify-center gap-2">
                                    <button
                                        className={`px-3 py-1 rounded ${user.isBanned ? 'bg-green-500' : 'bg-red-500'} text-white text-sm`}
                                        onClick={() => toggleBan(user._id, user.isBanned)}
                                    >
                                        {user.isBanned ? 'Banı aç' : 'Ban et'}
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded bg-gray-700 text-white text-sm"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    Nəticə tapılmadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
