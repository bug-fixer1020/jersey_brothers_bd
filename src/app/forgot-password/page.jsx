'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await res.json();
    setMessage(data.message);
    if (data.resetToken) {
      setResetToken(data.resetToken);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to reset password
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message && (
            <div className="text-green-500 text-sm text-center">{message}</div>
          )}
          
          {resetToken && (
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">Demo Reset Token:</p>
              <p className="text-xs text-gray-600 break-all">{resetToken}</p>
              <Link 
                href={`/reset-password?token=${resetToken}`}
                className="mt-2 inline-block text-blue-600 text-sm"
              >
                Click here to reset password →
              </Link>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </form>
        
        <p className="text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}