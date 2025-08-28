import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/interview');
    } else {
      navigate('/signup');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">
          Welcome to <span className="text-pink-500">AI Interview Coach</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Your personal AI-powered coach to help you ace your next interview.<br />
          Practice, get feedback, and boost your confidence with smart, interactive sessions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-yellow-400 to-pink-400 text-indigo-900 font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-yellow-300 hover:to-pink-300 transition"
          >
            Get Started
          </button>
          <a
            href="/about"
            className="bg-white border border-indigo-300 text-indigo-700 font-medium px-8 py-3 rounded-lg shadow hover:bg-indigo-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="mt-12">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
          alt="Interview illustration"
          className="rounded-xl shadow-xl w-full max-w-md mx-auto"
        />
      </div>
    </main>
  );
};

export default Home;