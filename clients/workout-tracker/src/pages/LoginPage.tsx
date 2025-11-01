import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateWithWebAuthn, isWebAuthnSupported } from '../lib/webauthn';
import { setAuthToken } from '../lib/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isWebAuthnSupported()) {
      setError('WebAuthn is not supported in your browser. Please use a modern browser with biometric authentication support.');
      setLoading(false);
      return;
    }

    try {
      const result = await authenticateWithWebAuthn(email);
      setAuthToken(result.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setError('');
    setLoading(true);

    if (!isWebAuthnSupported()) {
      setError('WebAuthn is not supported in your browser.');
      setLoading(false);
      return;
    }

    try {
      const result = await authenticateWithWebAuthn();
      setAuthToken(result.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            💪 Workout Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Login with biometric authentication
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleQuickLogin}
            disabled={loading}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Quick Login 🔐'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or login with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input mt-1"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Login with Email 🔐'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Register
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            WebAuthn uses your device's biometric authentication (Face ID, Touch ID, Windows Hello, etc.)
            to securely log you in without passwords.
          </p>
        </div>
      </div>
    </div>
  );
}

