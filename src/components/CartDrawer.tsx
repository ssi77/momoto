import { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

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

type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    currency: string;
    thumbnail_url?: string;
    images?: string[];
  };
};

export default function CartDrawer({
  open,
  onClose,
  onCountChange,
}: {
  open: boolean;
  onClose: () => void;
  onCountChange?: (n: number) => void;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/ecommerce/137/cart/${SESSION_ID}`);
      if (r.ok) {
        const d = await r.json();
        setItems(d.items || d.cart_items || []);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) load();
  }, [open]);

  useEffect(() => {
    const count = items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    onCountChange?.(count);
  }, [items, onCountChange]);

  const updateQty = async (itemId: string, qty: number) => {
    if (qty < 1) return remove(itemId);
    setItems((prev) => prev.map((it) => (it.id === itemId ? { ...it, quantity: qty } : it)));
    try {
      await fetch(`${API_BASE}/ecommerce/137/cart/${SESSION_ID}/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: qty }),
      });
    } catch {}
  };

  const remove = async (itemId: string) => {
    setItems((prev) => prev.filter((it) => it.id !== itemId));
    try {
      await fetch(`${API_BASE}/ecommerce/137/cart/${SESSION_ID}/${itemId}`, { method: 'DELETE' });
    } catch {}
  };

  const subtotal = items.reduce((acc, it) => acc + (it.product?.price || 0) * (it.quantity || 0), 0);

  const checkout = async () => {
    setCheckingOut(true);
    try {
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
      if (d.checkout_url) {
        window.location.href = d.checkout_url;
      } else {
        setCheckingOut(false);
      }
    } catch {
      setCheckingOut(false);
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n);

  return (
    <div className={`fixed inset-0 z-[120] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-[#181D15] border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF4D2E]" />
            <h2 className="font-bold text-[#FAF5FF] text-lg" style={{ fontFamily: 'var(--font-display)' }}>
              Il tuo carrello
            </h2>
            <span className="text-sm text-[#A89CB5]">({items.length})</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi carrello"
            className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-[#FAF5FF] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🏍️</div>
              <h3 className="text-lg font-bold text-[#FAF5FF] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Carrello vuoto
              </h3>
              <p className="text-sm text-[#A89CB5]">Aggiungi qualcosa di bello dal garage.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((it) => {
                const img = it.product?.thumbnail_url || (it.product?.images && it.product.images[0]);
                return (
                  <div key={it.id} className="flex gap-3 p-3 rounded-2xl bg-[#272B24] border border-white/5">
                    <div className="h-20 w-20 rounded-xl overflow-hidden bg-[#1a1f15] flex-shrink-0">
                      {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#FAF5FF] line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>
                        {it.product?.name || 'Articolo'}
                      </h4>
                      <div className="text-sm text-[#FAF5FF] font-bold mt-1">
                        {formatPrice((it.product?.price || 0) * it.quantity)}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-[#181D15] rounded-full">
                          <button
                            onClick={() => updateQty(it.id, it.quantity - 1)}
                            aria-label="Diminuisci"
                            className="h-7 w-7 flex items-center justify-center text-[#FAF5FF] hover:text-[#FF4D2E]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-sm text-[#FAF5FF]">{it.quantity}</span>
                          <button
                            onClick={() => updateQty(it.id, it.quantity + 1)}
                            aria-label="Aumenta"
                            className="h-7 w-7 flex items-center justify-center text-[#FAF5FF] hover:text-[#FF4D2E]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(it.id)}
                          className="text-xs text-[#A89CB5] hover:text-[#FF4D2E]"
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-white/5 bg-[#1a1f15]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#A89CB5]">Subtotale</span>
              <span className="text-xl font-bold text-[#FAF5FF]">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-[#A89CB5] mb-4">Spedizione e IVA calcolate al checkout.</p>
            <button
              onClick={checkout}
              disabled={checkingOut}
              className="w-full h-14 rounded-2xl bg-[#FF4D2E] text-white font-semibold hover:brightness-110 transition disabled:opacity-60"
            >
              {checkingOut ? 'Reindirizzamento a Stripe…' : 'Vai al checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}