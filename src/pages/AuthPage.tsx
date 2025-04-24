import { useState } from 'react';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setError(null);
        alert('Login successful!');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setError(null);
        alert('Account created successfully!');
      }
    } catch (error) {
      setError('Failed to connect to the server');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      handleLogin();
    } else if (mode === 'register') {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>

          <div className="mt-4 flex justify-center">
            <div className="flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setMode('login')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${mode === 'login' ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-red-500'}`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('register')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${mode === 'register' ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-red-500'}`}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {mode === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-700 text-white"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-700 text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
