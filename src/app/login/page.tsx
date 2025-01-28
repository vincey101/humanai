'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/features/auth/userSlice';
import { AppDispatch } from '../store';
import { RootState } from '../store';
import mediaService from '@/services/media.service';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      {/* Background image */}
      <div className="absolute overflow-hidden -z-10 top-0 left-0 w-screen h-screen">
        <img
          className="w-full h-full object-cover"
          src={mediaService.authBackgroundImage}
          alt="Background"
        />
      </div>

      {/* Login Form */}
      <form className="bg-white rounded-lg shadow-sm p-8 w-[90vw] sm:w-[50vw] mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Human<span className="font-[300]">AI</span>
        </h1>
        <p className="text-xs mb-6">Enter Your Login Details</p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </div>

        {/* Registration Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
