import React, { useState } from 'react';
import axios from 'axios';
import styles from './BookingForm.module.css';

const BookingForm = ({ hotelId }) => {
    const [guests, setGuests] = useState(1);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!token) {
            setError('Rezervasiya etmək üçün daxil olmalısınız');
            return;
        }

        if (!checkIn || !checkOut) {
            setError('Giriş və çıxış tarixlərini daxil edin');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:2000/api/reservations', 
                { hotel: hotelId, checkIn, checkOut, guests },
                { headers: { Authorization: `Bearer ${token}` } }
            );


            // Rezervasiya uğurla başa çatdı
            setSuccess('Rezervasiya uğurla əlavə edildi!');
            setGuests(1);
            setCheckIn('');
            setCheckOut('');
        } catch (err) {
            console.error('Rezervasiya xətası:', err.response?.data || err.message);

            const serverMsg = err.response?.data?.message;
            const fallbackMsg = err.response?.data?.error;
            setError(serverMsg || fallbackMsg || 'Xəta baş verdi');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h3 className={styles.formTitle}>Rezervasiya et</h3>

            <label className={styles.label}>Otaq sayı:</label>
            <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
                className={styles.input}
            />

            <label className={styles.label}>Giriş tarixi:</label>
            <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className={styles.input}
            />

            <label className={styles.label}>Çıxış tarixi:</label>
            <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className={styles.input}
            />

            {error && <p className={styles.errorMsg}>{error}</p>}
            {success && <p className={styles.successMsg}>{success}</p>}

            <button type="submit" className={styles.submitBtn}>Rezervasiya et</button>
        </form>
    );
};

export default BookingForm;
