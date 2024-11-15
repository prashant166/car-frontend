import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import CarCard from '../components/CarCard';

function Home() {
  const { token } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = searchQuery
          ? await api.get(`/cars/search?q=${encodeURIComponent(searchQuery)}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : await api.get('/cars', {
              headers: { Authorization: `Bearer ${token}` },
            });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [token, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Car Listings'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.length ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-center col-span-full">No cars found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
