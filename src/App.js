import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AddCar from './pages/AddCar';
import MyCars from './pages/MyCars';
import EditCar from './pages/EditCar';
import CarDetail from './pages/CarDetail'; // Import CarDetail

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/my-cars" element={<MyCars />} />
          <Route path="/edit-car/:id" element={<EditCar />} />
          <Route path="/cars/:id" element={<CarDetail />} /> {/* Car Detail route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
