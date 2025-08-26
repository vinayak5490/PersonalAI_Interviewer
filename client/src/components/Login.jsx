import React, { useState } from 'react';
import {  Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e =>{
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(form),
        });
        const data = await res.json();
        setLoading(false);
        if(!res.ok){
            setError(data.message || 'Login failed');
        }else{
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Login successful');
            navigate('/upload');
        }
    } catch (error) {
        setLoading(false);
        setError('Network error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-white via-indigo-50 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Login to <span className="text-pink-500">AI Interview Coach</span>
        </h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 rounded px-3 py-2 text-sm text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Your password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-md hover:from-indigo-400 hover:to-pink-400 transition mb-4"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline font-semibold">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;