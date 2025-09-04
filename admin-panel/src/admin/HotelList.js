import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HotelList.css';

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
    <div className="hotel-list-container">
      <h1 className="hotel-list-title">🏨 Otellər</h1>
      <div className="table-wrapper">
        <table className="hotel-table">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Ad</th>
              <th className="px-3 py-2 text-left hidden-sm">Ünvan</th>
              <th className="px-3 py-2 text-left">Reytinq</th>
              <th className="px-3 py-2 text-left hidden-md">Status</th>
              <th className="px-3 py-2 text-center">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr key={hotel._id} className="border-top hover:bg-gray-50">
                <td className="px-3 py-2 font-medium">{hotel.name}</td>
                <td className="px-3 py-2 hidden-sm">{hotel.address || '-'}</td>
                <td className="px-3 py-2">{hotel.rating ?? 'Yoxdur'}</td>
                <td className="px-3 py-2 hidden-md capitalize">{hotel.status || 'Naməlum'}</td>
                <td className="px-3 py-2 text-center operations-cell">
                  <button onClick={() => deleteHotel(hotel._id)} className="btn btn-red">
                    Sil
                  </button>

                  {hotel.status === 'pending' && (
                    <>
                      <button onClick={() => approveHotel(hotel._id)} className="btn btn-green">
                        Təsdiqlə
                      </button>
                      <button onClick={() => rejectHotel(hotel._id)} className="btn btn-yellow">
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
