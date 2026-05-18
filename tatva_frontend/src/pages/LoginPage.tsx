import { useState, FormEvent } from 'react';
import { Input } from '../components/atoms/Input';
import { authApi, tokenStorage } from '../services/authApi';

interface LoginPageProps {
  onLogin: (name: string) => void;
  onGoSignup: () => void;
}

export const LoginPage = ({ onLogin, onGoSignup }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      tokenStorage.set(res.token);
      onLogin(res.name);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#343541]">
      <div className="w-full max-w-sm bg-[#202123] rounded-2xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to Tatva AI</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button onClick={onGoSignup} className="text-violet-400 hover:underline cursor-pointer">Sign up</button>
        </p>
      </div>
    </div>
  );
};
