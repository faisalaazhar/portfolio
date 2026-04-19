import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Lock } from 'lucide-react';

export default function AdminLoginModal({ onClose }) {
  const { login } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError('Incorrect password. Try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-bark/40 backdrop-blur-sm">
      <div className="bg-cream rounded-2xl border border-sand shadow-2xl p-8 w-full max-w-sm mx-4 animate-fadeUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-terra" />
            <h2 className="font-serif text-xl text-bark">Admin Login</h2>
          </div>
          <button onClick={onClose} className="text-bark-muted hover:text-terra transition-colors">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-bark-light mb-5">
          Enter your admin password to enable editing mode.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-lg border border-sand bg-white text-bark text-sm outline-none focus:border-terra transition-colors"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-terra text-white rounded-lg text-sm font-medium hover:bg-bark transition-colors"
          >
            Enter Admin Mode
          </button>
        </form>
      </div>
    </div>
  );
}
