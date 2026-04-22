import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Settings, X, LogOut } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { data, adminMode, logout } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md border-b border-sand shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-serif italic text-terra text-xl tracking-tight">
            {data.personal.shortName}.dev
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[0.9rem] font-medium uppercase tracking-widest text-bark-light hover:text-terra transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Admin toggle */}
          <div className="flex items-center gap-3">
            {adminMode ? (
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-1.5 text-[0.75rem] font-medium text-terra border border-terra/30 rounded-full px-3 py-1 hover:bg-terra/10 transition-colors"
              >
                <LogOut size={12} />
                Exit Admin
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden md:flex items-center gap-1.5 text-[0.75rem] font-medium text-bark-muted hover:text-terra transition-colors"
                title="Admin mode"
              >
                <Settings size={18} />
              </button>
            )}

            {/* Mobile burger */}
            <button
              className="md:hidden text-bark"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : (
                <div className="flex flex-col gap-1.5">
                  <span className="block w-5 h-0.5 bg-bark" />
                  <span className="block w-5 h-0.5 bg-bark" />
                  <span className="block w-5 h-0.5 bg-bark" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-sand px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-widest text-bark-light hover:text-terra transition-colors"
              >
                {l.label}
              </a>
            ))}
            {adminMode ? (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm text-terra text-left">
                Exit Admin Mode
              </button>
            ) : (
              <button onClick={() => { setShowLogin(true); setMenuOpen(false); }} className="text-sm text-bark-muted text-left">
                Admin Login
              </button>
            )}
          </div>
        )}
      </nav>

      {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
