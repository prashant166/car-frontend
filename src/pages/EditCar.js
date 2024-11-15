import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function EditCar() {
  const { id } = useParams(); // Get the car ID from the URL
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]); // New images to upload

  useEffect(() => {
    // Fetch the car details when the component mounts
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const car = response.data;

        setTitle(car.title);
        setDescription(car.description);
        setTags(car.tags);
        setImages(car.images);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));

    // Append new images if uploaded
    newImages.forEach((file) => formData.append('images', file));

    try {
      await api.put(`/cars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/my-cars'); // Redirect to My Cars after successful update
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Car</h2>
        
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 mb-4 rounded w-full focus:outline-none focus:border-black"
        />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 mb-4 rounded w-full focus:outline-none focus:border-black"
          rows="4"
        ></textarea>

        <label className="block mb-2 font-semibold">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
          className="border border-gray-300 p-2 mb-4 rounded w-full focus:outline-none focus:border-black"
        />

        <label className="block mb-2 font-semibold">Current Images</label>
        <div className="flex space-x-2 mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:4646/${image.replace(/\\/g, '/')}`}
              alt="Car"
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>

        <label className="block mb-2 font-semibold">Upload New Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => setNewImages(Array.from(e.target.files))}
          className="border border-gray-300 p-2 mb-6 rounded w-full focus:outline-none focus:border-black"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-400"
        >
          Update Car
        </button>
      </form>
    </div>
  );
}

export default EditCar;
