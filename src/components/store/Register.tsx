import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building2, ArrowRight } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'tenant',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Fetch CSRF token if using Laravel Sanctum
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
      });
  
      // Send the registration request
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }
  
      const data = await response.json();
      alert('Registration successful!');
      navigate('/login'); // Redirect to /login
      console.log(data);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Join PG Hunt to find your perfect accommodation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">I am a</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    name="userType"
                    value="tenant"
                    checked={formData.userType === 'tenant'}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg
                    peer-checked:border-indigo-500 peer-checked:bg-indigo-50 cursor-pointer
                    hover:bg-gray-50 transition-all duration-200">
                    <User className="w-5 h-5 text-gray-500 peer-checked:text-indigo-600" />
                    <span className="font-medium text-gray-900">Tenant</span>
                  </div>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    name="userType"
                    value="owner"
                    checked={formData.userType === 'owner'}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg
                    peer-checked:border-indigo-500 peer-checked:bg-indigo-50 cursor-pointer
                    hover:bg-gray-50 transition-all duration-200">
                    <Building2 className="w-5 h-5 text-gray-500 peer-checked:text-indigo-600" />
                    <span className="font-medium text-gray-900">PG Owner</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}