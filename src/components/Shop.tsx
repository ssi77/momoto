import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const API_BASE = 'https://creafi-backend-jbi1.onrender.com';

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

export default function Shop({ onAdd }: { onAdd?: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'featured' | 'low' | 'high' | 'new'>('featured');
  const [adding, setAdding] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/ecommerce/137/products?status=active&limit=50`);
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

  const filtered = useMemo(() => {
    let arr = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'low') arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === 'high') arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [products, search, sort]);

  const addToCart = async (p: Product) => {
    setAdding(p.id);
    try {
      await fetch(`${API_BASE}/ecommerce/137/cart/${SESSION_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: p.id, quantity: 1 }),
      });
    } catch {}
    setTimeout(() => {
      setAdding(null);
      onAdd?.();
    }, 400);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);

  const discount = (p: Product) =>
    p.compare_at_price && p.compare_at_price > p.price
      ? Math.round((1 - p.price / p.compare_at_price) * 100)
      : 0;

  return (
    <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#FFB800] uppercase tracking-wider mb-3">Shop</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAF5FF]" style={{ fontFamily: 'var(--font-display)' }}>
            Tutto il catalogo
          </h1>
          <p className="text-[#A89CB5] mt-3">
            {loading ? 'Caricamento…' : `${filtered.length} articoli disponibili`}
          </p>
        </div>

        <div className="sticky top-24 z-20 bg-[#181D15]/95 backdrop-blur-xl -mx-4 px-4 md:mx-0 md:px-0 py-4 mb-8 border-b border-white/5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89CB5]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cerca articoli…"
                aria-label="Cerca"
                className="w-full h-12 pl-11 pr-10 rounded-2xl bg-[#272B24] border border-white/5 text-[#FAF5FF] placeholder:text-[#A89CB5] focus:outline-none focus:border-[#FF4D2E]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Pulisci"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/5 text-[#A89CB5] hover:text-[#FAF5FF] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89CB5] pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                aria-label="Ordina"
                className="appearance-none h-12 pl-11 pr-10 rounded-2xl bg-[#272B24] border border-white/5 text-[#FAF5FF] focus:outline-none focus:border-[#FF4D2E] cursor-pointer"
              >
                <option value="featured">In evidenza</option>
                <option value="low">Prezzo: basso → alto</option>
                <option value="high">Prezzo: alto → basso</option>
                <option value="new">Più recenti</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-[#272B24] border border-white/5 overflow-hidden">
                <div className="aspect-square bg-white/5 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl bg-[#272B24] border border-white/5 p-12 text-center">
            <div className="text-5xl mb-4">🏍️</div>
            <h3 className="text-xl font-bold text-[#FAF5FF] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {products.length === 0 ? 'I prodotti arrivano presto' : 'Nessun risultato'}
            </h3>
            <p className="text-[#A89CB5]">
              {products.length === 0
                ? 'Il founder sta caricando il catalogo. Torna a trovarci.'
                : 'Prova a cercare qualcos\'altro.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((p) => {
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
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${p.id}`}>
                      <h3 className="text-sm font-semibold text-[#FAF5FF] line-clamp-2 hover:text-[#FF4D2E] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#A89CB5] mt-1 line-clamp-1">{p.description}</p>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-lg font-bold text-[#FAF5FF]">{formatPrice(p.price)}</div>
                        {p.compare_at_price && p.compare_at_price > p.price && (
                          <div className="text-xs text-[#A89CB5] line-through">{formatPrice(p.compare_at_price)}</div>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        disabled={adding === p.id}
                        className="h-9 px-3 rounded-full bg-[#FF4D2E] text-white text-xs font-semibold hover:brightness-110 transition disabled:opacity-60"
                      >
                        {adding === p.id ? '…' : 'Aggiungi'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}