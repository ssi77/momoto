import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const API_BASE = 'https://creafi-backend-jbi1.onrender.com';
const SESSION_ID = (() => {
  try {
    let s = localStorage.getItem('cart_session');
    if (!s) {
      s = crypto.randomUUID();
      localStorage.setItem('cart_session', s);
    }
    return s;
  } catch {
    return 'demo-session';
  }
})();

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  currency: string;
  thumbnail_url?: string;
  images?: string[];
};

export default function Bestsellers({ onAdd }: { onAdd?: (p: Product) => void }) {
  const reveal = useReveal();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/ecommerce/137/products?status=active&limit=8`);
        if (!r.ok) throw new Error('fail');
        const d = await r.json();
        if (!cancelled) setProducts(d.products || []);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addToCart = async (p: Product) => {
    try {
      await fetch(`${API_BASE}/ecommerce/137/cart/${SESSION_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: p.id, quantity: 1 }),
      });
    } catch {}
    onAdd?.(p);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);

  const discount = (p: Product) =>
    p.compare_at_price && p.compare_at_price > p.price
      ? Math.round((1 - p.price / p.compare_at_price) * 100)
      : 0;

  return (
    <section className="py-20 md:py-32 bg-[#1a1f15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={reveal.ref} style={reveal.style} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-[#FFB800] uppercase tracking-wider mb-3">
              Best seller
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#FAF5FF]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              I preferiti dei rider
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF4D2E] hover:gap-3 transition-all"
          >
            Vedi tutto →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-[#272B24] border border-white/5 overflow-hidden">
                <div className="aspect-square bg-white/5 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl bg-[#272B24] border border-white/5 p-12 text-center">
            <div className="text-5xl mb-4">🏍️</div>
            <h3 className="text-xl font-bold text-[#FAF5FF] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              I prodotti arrivano presto
            </h3>
            <p className="text-[#A89CB5]">Il founder sta caricando il catalogo. Torna a trovarci.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => {
              const off = discount(p);
              return (
                <div
                  key={p.id}
                  className="group rounded-3xl bg-[#272B24] border border-white/5 overflow-hidden hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to={`/product/${p.id}`} className="block relative aspect-square overflow-hidden bg-[#1a1f15]">
                    {p.thumbnail_url || (p.images && p.images[0]) ? (
                      <img
                        src={p.thumbnail_url || p.images![0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#A89CB5] text-sm">
                        Momoto
                      </div>
                    )}
                    {off > 0 && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#FF4D2E] text-white text-[10px] font-bold uppercase">
                        -{off}%
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      aria-label="Aggiungi ai preferiti"
                      className="absolute top-3 right-3 h-9 w-9 rounded-full bg-[#181D15]/80 backdrop-blur text-[#FAF5FF] flex items-center justify-center hover:bg-[#FF4D2E] transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-[#FFB800] text-xs mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                      ))}
                      <span className="text-[#A89CB5] ml-1">(48)</span>
                    </div>
                    <Link to={`/product/${p.id}`}>
                      <h3 className="text-sm font-semibold text-[#FAF5FF] line-clamp-2 hover:text-[#FF4D2E] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                        {p.name}
                      </h3>
                    </Link>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-lg font-bold text-[#FAF5FF]">{formatPrice(p.price)}</div>
                        {p.compare_at_price && p.compare_at_price > p.price && (
                          <div className="text-xs text-[#A89CB5] line-through">{formatPrice(p.compare_at_price)}</div>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        aria-label="Aggiungi al carrello"
                        className="h-9 w-9 rounded-full bg-[#FF4D2E] text-white flex items-center justify-center hover:brightness-110 transition"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}