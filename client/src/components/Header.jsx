import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg py-6 w-full">
      <div className="flex items-center justify-between px-4 w-full">
        <div className="flex items-center space-x-3">
          <span className="text-white text-3xl font-bold tracking-tight flex items-center">
            <svg className="w-8 h-8 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 20v-6m0 0V4m0 10l3.5-3.5M12 14l-3.5-3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            AI Interview Coach
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="text-white hover:text-yellow-300 font-medium transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-yellow-300 font-medium transition">About</Link>
            </li>
            {!token ? (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-yellow-300 font-medium transition">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="bg-yellow-400 text-indigo-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 transition">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-white font-medium">
                  Hi, {user.name || 'User'}
                </li>
                <li>
                  <Link to="/profile" className="text-white hover:text-yellow-300 font-medium transition">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-400 text-indigo-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;