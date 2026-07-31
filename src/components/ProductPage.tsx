import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Shield, Truck, RotateCcw, Headphones, Star, Minus, Plus, ShoppingBag } from 'lucide-react';

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
  images?: string[];
  thumbnail_url?: string;
  inventory_count?: number;
  variants?: { id: string; name: string; price?: number; image?: string }[];
};

export default function ProductPage({ onAdd, onCheckout }: { onAdd?: () => void; onCheckout?: () => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/ecommerce/137/products/${id}`);
        if (!r.ok) throw new Error('not found');
        const d: Product = await r.json();
        if (!cancelled) setProduct(d);
      } catch {
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    (async () => {
      try {
        const r = await fetch(`${API_BASE}/ecommerce/137/products?status=active&limit=4`);
        if (!r.ok) return;
        const d = await r.json();
        if (!cancelled) setRelated((d.products || []).filter((p: Product) => p.id !== id).slice(0, 4));
      } catch {}
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const images = product?.images?.length ? product.images : product?.thumbnail_url ? [product.thumbnail_url] : [];

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);

  const off = product?.compare_at_price && product.compare_at_price > product.price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0;

  const addToCart = async (thenCheckout: boolean) => {
    if (!product) return;
    setBusy(true);
    try {
      await fetch(`${API_BASE}/ecommerce/137/cart/${SESSION_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, quantity: qty }),
      });
      onAdd?.();
      if (thenCheckout) {
        const r = await fetch(`${API_BASE}/ecommerce/137/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: SESSION_ID,
            success_url: window.location.origin + '/?paid=1',
            cancel_url: window.location.href,
          }),
        });
        const d = await r.json();
        if (d.checkout_url) window.location.href = d.checkout_url;
        else onCheckout?.();
      }
    } catch {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-[#181D15]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="aspect-square rounded-3xl bg-white/5 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-white/5 rounded animate-pulse" />
              <div className="h-6 w-1/3 bg-white/5 rounded animate-pulse" />
              <div className="h-20 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-[#181D15] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛞</div>
          <h2 className="text-2xl font-bold text-[#FAF5FF] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Prodotto non trovato
          </h2>
          <Link to="/shop" className="text-[#FF4D2E] hover:underline">
            Torna allo shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-[#A89CB5] hover:text-[#FAF5FF] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna indietro
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#272B24] border border-white/5 mb-4">
              {images[activeImage] ? (
                <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#A89CB5]">Momoto</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 rounded-2xl overflow-hidden border-2 transition ${
                      activeImage === i ? 'border-[#FF4D2E]' : 'border-white/5'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 text-[#FFB800] text-sm mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
              ))}
              <span className="text-[#A89CB5] ml-1">(48 recensioni)</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#FAF5FF] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h1>

            <p className="text-[#A89CB5] mb-6">Codice: {product.id.slice(0, 8).toUpperCase()}</p>

            <div className="flex items-end gap-3 mb-2">
              <div className="text-4xl font-bold text-[#FAF5FF]">{formatPrice(product.price)}</div>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <>
                  <div className="text-lg text-[#A89CB5] line-through mb-1">{formatPrice(product.compare_at_price)}</div>
                  <span className="mb-1 px-2 py-0.5 rounded-full bg-[#FF4D2E] text-white text-xs font-bold">-{off}%</span>
                </>
              )}
            </div>
            <p className="text-xs text-[#A89CB5] mb-8">IVA inclusa · Spedizione calcolata al checkout</p>

            <p className="text-[#FAF5FF]/80 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-[#FAF5FF]">Quantità</span>
              <div className="flex items-center bg-[#272B24] border border-white/5 rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Diminuisci"
                  className="h-10 w-10 flex items-center justify-center text-[#FAF5FF] hover:text-[#FF4D2E]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-[#FAF5FF]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Aumenta"
                  className="h-10 w-10 flex items-center justify-center text-[#FAF5FF] hover:text-[#FF4D2E]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {typeof product.inventory_count === 'number' && product.inventory_count < 10 && product.inventory_count > 0 && (
                <span className="text-xs text-[#FFB800] font-semibold">Solo {product.inventory_count} disponibili</span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => addToCart(false)}
                disabled={busy}
                className="flex-1 h-14 rounded-2xl bg-[#FF4D2E] text-white font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
              >
                <ShoppingBag className="w-4 h-4" />
                Aggiungi al carrello
              </button>
              <button
                onClick={() => addToCart(true)}
                disabled={busy}
                className="flex-1 h-14 rounded-2xl bg-[#272B24] border border-[#FF4D2E]/30 text-[#FF4D2E] font-semibold hover:bg-[#FF4D2E]/10 transition disabled:opacity-60"
              >
                {busy ? 'Reindirizzamento…' : 'Compra subito'}
              </button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#272B24] border border-white/5">
              {[
                { Icon: Shield, t: 'Pagamenti sicuri Stripe' },
                { Icon: Truck, t: 'Spedizione 24/48h' },
                { Icon: RotateCcw, t: 'Resi gratuiti 30gg' },
                { Icon: Headphones, t: 'Supporto rider-to-rider' },
              ].map(({ Icon, t }) => (
                <div key={t} className="flex items-center gap-2 text-xs text-[#FAF5FF]/80">
                  <Icon className="w-4 h-4 text-[#FF4D2E]" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF5FF] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              Potrebbe piacerti anche
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="rounded-3xl bg-[#272B24] border border-white/5 overflow-hidden hover:-translate-y-1 transition"
                >
                  <div className="aspect-square bg-[#1a1f15] overflow-hidden">
                    {p.thumbnail_url || (p.images && p.images[0]) ? (
                      <img src={p.thumbnail_url || p.images![0]} alt={p.name} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#FAF5FF] line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {p.name}
                    </h3>
                    <div className="text-sm font-bold text-[#FAF5FF] mt-2">{formatPrice(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}