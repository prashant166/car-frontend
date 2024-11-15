import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarList() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/cars', {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: searchQuery },
      });
      setCars(response.data);
    };
    fetchCars();
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search cars"
      />
      <div>
        {cars.map(car => (
          <div key={car.id}>
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            {/* Additional car details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
