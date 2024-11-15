import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import CarCard from '../components/CarCard';

function MyCars() {
  const { token } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const response = await api.get('/cars/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching user cars:', error);
      }
    };

    fetchUserCars();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Listed Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.length ? (
          cars.map((car) => (
            <CarCard key={car.id} car={car} isEditable={true} /> // Pass `isEditable` prop
          ))
        ) : (
          <p className="text-center col-span-full">No cars found.</p>
        )}
      </div>
    </div>
  );
}

export default MyCars;
