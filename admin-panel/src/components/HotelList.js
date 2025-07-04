import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:2000/api/admin/hotels', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Otellər alınmadı:', err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [refresh]);

  const deleteHotel = async (hotelId) => {
    if (!window.confirm('Bu oteli silmək istədiyinizə əminsiniz?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:2000/api/admin/hotels/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Otel uğurla silindi');
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Otel silinmədi:', err.response?.data || err.message);
      alert('Otel silinərkən xəta baş verdi');
    }
  };

  const approveHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:2000/api/admin/hotels/${hotelId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Otel təsdiqləndi');
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Otel təsdiqlənmədi:', err.response?.data || err.message);
      alert('Təsdiqləmə zamanı xəta baş verdi');
    }
  };

  const rejectHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:2000/api/admin/hotels/${hotelId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Otel imtina edildi');
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Otel imtina edilmədi:', err.response?.data || err.message);
      alert('İmtina zamanı xəta baş verdi');
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (hotels.length === 0) return <p>Heç bir otel tapılmadı.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🏨 Otellər</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Ad</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Ünvan</th>
              <th className="px-3 py-2 text-left">Reytinq</th>
              <th className="px-3 py-2 text-left hidden md:table-cell">Status</th>
              <th className="px-3 py-2 text-center">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr key={hotel._id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 font-medium">{hotel.name}</td>
                <td className="px-3 py-2 hidden sm:table-cell">{hotel.address || '-'}</td>
                <td className="px-3 py-2">{hotel.rating ?? 'Yoxdur'}</td>
                <td className="px-3 py-2 hidden md:table-cell capitalize">{hotel.status || 'Naməlum'}</td>
                <td className="px-3 py-2 text-center flex justify-center gap-2">
                  {/* Sil düyməsi */}
                  <button
                    onClick={() => deleteHotel(hotel._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Sil
                  </button>

                  {/* Status pending olanlar üçün təsdiqlə və imtina et düymələri */}
                  {hotel.status === 'pending' && (
                    <>
                      <button
                        onClick={() => approveHotel(hotel._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Təsdiqlə
                      </button>
                      <button
                        onClick={() => rejectHotel(hotel._id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                      >
                        İmtina et
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelList;
