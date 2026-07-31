import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/shop' },
  { label: 'Stories', to: '/stories' },
  { label: 'Community', to: '/community' },
];

export default function Navbar({ cartCount = 0, onCartClick }: { cartCount?: number; onCartClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center gap-2 md:gap-6 transition-all duration-500 ${
            scrolled
              ? 'bg-[#181D15]/95 backdrop-blur-xl border border-white/10 shadow-xl py-2 pl-3 pr-2 rounded-full'
              : 'bg-[#181D15]/80 backdrop-blur-md border border-white/5 py-2.5 pl-3 pr-2 rounded-full'
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group pr-2">
            <div className="h-9 w-9 rounded-xl bg-white/10 p-1 flex items-center justify-center">
              <img
                src="https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-59133019fa.png"
                alt="Momoto"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-bold text-[#FAF5FF] text-base tracking-tight hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
              Momoto
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 px-2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="px-4 py-1.5 text-sm font-medium text-[#FAF5FF]/80 hover:text-[#FAF5FF] rounded-full hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onCartClick}
              aria-label="Open cart"
              className="relative h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-[#FAF5FF] flex items-center justify-center transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[#FF4D2E] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/shop"
              className="hidden sm:inline-flex h-9 items-center px-4 rounded-full bg-[#FF4D2E] text-white text-sm font-semibold hover:brightness-110 transition"
            >
              Shop now
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-[#FAF5FF] flex items-center justify-center"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-0 z-[100] md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-[#181D15] border-l border-white/10 shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-white/10 p-1">
                <img src="https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-59133019fa.png" alt="Momoto" className="h-full w-full object-contain" />
              </div>
              <span className="font-bold text-[#FAF5FF]" style={{ fontFamily: 'var(--font-display)' }}>Momoto</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="h-9 w-9 rounded-full bg-white/5 text-[#FAF5FF] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="py-3 px-3 text-base font-medium text-[#FAF5FF]/90 hover:text-[#FAF5FF] hover:bg-white/5 rounded-xl transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="p-5 mt-auto">
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-2xl bg-[#FF4D2E] text-white font-semibold"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}