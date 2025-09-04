import React, { useState } from 'react';
import styles from './FilterSort.module.css';

const FilterSort = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  const handleFilter = () => {
    onFilter({
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      minRating: minRating ? Number(minRating) : null,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filtrlə</h3>

      <div className={styles.filterGroup}>
        <label>Minimum Qiymət (AZN):</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min"
        />
      </div>

      <div className={styles.filterGroup}>
        <label>Maksimum Qiymət (AZN):</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max"
        />
      </div>

      <div className={styles.filterGroup}>
        <label>Minimum Reytinq (0-5):</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          placeholder="Min Reytinq"
        />
      </div>

      <button onClick={handleFilter}>Tətbiq et</button>
    </div>
  );
};

export default FilterSort;
