import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Password reset link sent to your email');
      navigate('/login');
    } catch {
      toast.error('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 shadow-2xl rounded-3xl p-8 md:p-10 space-y-8 border border-gray-100 backdrop-blur-md">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full p-3 shadow-lg mb-2">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Reset Password</h2>
            <p className="mt-1 text-gray-600 text-base">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className={`block w-full rounded-lg border px-4 py-3 pl-11 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 ${
                    errors.email
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  {...register('email')}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-blue-200 bg-white text-blue-600 font-semibold hover:bg-blue-50 transition order-2 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition order-1 sm:order-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}