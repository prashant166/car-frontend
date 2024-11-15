import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function CarDetail() {
  const { id } = useParams(); // Get the car ID from the URL
  const { token } = useContext(AuthContext); // Fetch the token from AuthContext
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState(''); // Main image to display

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in the header
        });
        setCar(response.data);
        setMainImage(`http://localhost:4646/${response.data.images[0].replace(/\\/g, '/')}`); // Default to the first image
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id, token]);

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Left Section: Image Thumbnails */}
        <div className="flex-shrink-0 space-y-4 md:w-1/4">
          {car.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:4646/${image.replace(/\\/g, '/')}`}
              alt="Car Thumbnail"
              className={`w-full h-24 object-cover rounded cursor-pointer border ${
                mainImage === `http://localhost:4646/${image.replace(/\\/g, '/')}` ? 'border-black' : 'border-gray-300'
              }`}
              onClick={() => setMainImage(`http://localhost:4646/${image.replace(/\\/g, '/')}`)}
            />
          ))}
        </div>

        {/* Right Section: Main Image and Details */}
        <div className="flex-grow md:ml-8">
          {/* Main Image */}
          <div className="mb-6">
            <img
              src={mainImage}
              alt="Main Car"
              className="w-full h-96 object-cover rounded shadow-lg"
            />
          </div>

          {/* Car Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
            <p className="text-gray-600 mb-6">{car.description}</p>
            <div className="space-x-2 mb-6">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
