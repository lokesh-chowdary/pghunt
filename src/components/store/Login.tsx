import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from './authStore';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 404) {
          if (
            window.confirm(
              'Account does not exist. Would you like to create an account?'
            )
          ) {
            navigate('/register');
          }
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
        return;
      }

      const result = await response.json();

      login({
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        type: result.user.userType,
      });

      localStorage.setItem('token', result.token);
      alert('Login successful');
      navigate('/');
    } catch (error: any) {
      console.error('Error during login:', error);
      alert(error.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-2">
      <div className="w-full max-w-md md:max-w-lg">
        <div className="bg-white/90 shadow-2xl border border-gray-100 rounded-3xl p-6 sm:p-10 space-y-8 transition-all duration-300">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2 shadow-md">
              <img
                src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                alt="Logo"
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back!</h2>
            <p className="mt-1 text-gray-600 text-sm sm:text-base">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className={`input-field pl-10 pr-3 py-2 rounded-lg border transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 w-full ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  {...register('email')}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  className={`input-field pl-10 pr-3 py-2 rounded-lg border transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 w-full ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                  {...register('password')}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register('rememberMe')}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}