import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

export default function Newsletter() {
  const r = useReveal();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company_id: 137 }),
      });
      const d = await res.json();
      if (d.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#181D15]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div
          ref={r.ref}
          style={r.style}
          className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16"
          style={{
            ...r.style,
            background: 'linear-gradient(135deg, #FF4D2E 0%, #FF7A3D 50%, #FFB800 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, #FAF5FF 0%, transparent 40%), radial-gradient(circle at 80% 80%, #181D15 0%, transparent 40%)',
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181D15]/20 backdrop-blur-sm mb-6">
              <Mail className="w-3.5 h-3.5 text-[#181D15]" />
              <span className="text-xs font-bold text-[#181D15] uppercase tracking-wider">Newsletter</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#FAF5FF] mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sconto 10% sul primo ordine
            </h2>
            <p className="text-lg text-[#FAF5FF]/90 mb-8">
              Iscriviti alla newsletter dei Momoto Riders: offerte esclusive, nuove collezioni e storie su due ruote.
            </p>

            {status === 'success' ? (
              <div className="bg-[#181D15]/20 backdrop-blur rounded-2xl p-6 text-[#FAF5FF] font-semibold">
                ✓ Benvenuto nella tribe! Controlla la tua email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it"
                  aria-label="Email"
                  className="flex-1 h-14 px-5 rounded-2xl bg-[#FAF5FF] text-[#181D15] placeholder:text-[#181D15]/40 font-medium focus:outline-none focus:ring-4 focus:ring-[#181D15]/20"
                />
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="h-14 px-6 rounded-2xl bg-[#181D15] text-[#FAF5FF] font-semibold hover:bg-[#181D15]/90 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Invio…' : 'Iscriviti'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-sm text-[#181D15] mt-3 font-semibold">Qualcosa è andato storto, riprova.</p>
            )}
            <p className="text-xs text-[#FAF5FF]/70 mt-4">Zero spam, promesso. Cancellati quando vuoi.</p>
          </div>
        </div>
      </div>
    </section>
  );
}