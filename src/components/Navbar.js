import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear the search input after navigating
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">
        <Link to="/">Car Management</Link>
      </h1>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 rounded bg-gray-200 text-black"
        />
        <button type="submit" className="bg-gray-600 p-1 rounded text-white hover:bg-gray-500">
          Search
        </button>
      </form>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/my-cars" className="hover:text-gray-400">My Cars</Link> {/* New My Cars link */}
        <Link to="/add-car" className="hover:text-gray-400">Add Car</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
