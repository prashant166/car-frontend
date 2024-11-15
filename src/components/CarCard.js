import React from 'react';
import { useNavigate } from 'react-router-dom';

function CarCard({ car, isEditable }) {
  const { id, title, description, tags, images } = car;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-car/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 mx-auto">
      <img
        src={`http://localhost:4646/${images[0].replace(/\\/g, '/')}`} // Display the first image
        alt={title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        {isEditable && ( // Show Edit button only if `isEditable` is true
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-400"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default CarCard;
