import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../api';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [forgot, setForgot] = useState(false);

  if (user) {
    navigate('/admin');
    return null;
  }

  const onLogin = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const onForgot = async (data) => {
    try {
      await adminApi.forgotPassword(data.email);
      toast.success('Reset link sent if email exists');
      setForgot(false);
    } catch {
      toast.error('Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">AC</div>
          <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Astra Cognix Solutions</p>
        </div>

        {forgot ? (
          <form onSubmit={handleSubmit(onForgot)} className="space-y-4">
            <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-xl dark:bg-gray-900 dark:border-gray-600 dark:text-white" required />
            <button type="submit" className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">Send Reset Link</button>
            <button type="button" onClick={() => setForgot(false)} className="w-full text-sm text-primary-600">Back to Login</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-xl dark:bg-gray-900 dark:border-gray-600 dark:text-white" required />
            <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-xl dark:bg-gray-900 dark:border-gray-600 dark:text-white" required />
            <button type="submit" disabled={isSubmitting} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold disabled:opacity-50">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
            <button type="button" onClick={() => setForgot(true)} className="w-full text-sm text-primary-600 hover:underline">Forgot Password?</button>
          </form>
        )}
        <Link to="/" className="block text-center text-sm text-gray-500 mt-6 hover:text-primary-600">← Back to Website</Link>
      </div>
    </div>
  );
}
