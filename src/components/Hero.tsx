import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Hero() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section className="relative min-h-screen pt-32 md:pt-40 pb-20 flex items-center justify-center overflow-hidden">
      {/* Hero background video */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          src="https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-000128bb81-96581991a29c.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-[#181D15]/60" />
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF4D2E 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 -right-20 w-72 h-72 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFB800 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00E5C7 0%, transparent 70%)' }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(250,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,245,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
        <div ref={r1.ref} style={r1.style}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span className="text-sm font-medium text-[#FAF5FF]/90">Nuova collezione Autunno/Inverno live</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#FF4D2E] text-white text-[10px] font-bold uppercase tracking-wider">
              New
            </span>
          </div>
        </div>

        <h1
          className="font-bold text-[#FAF5FF] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Dove la passione
          <br />
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(90deg, #FF4D2E 0%, #FFB800 50%, #00E5C7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            incontra la strada.
          </span>
        </h1>

        <p
          ref={r2.ref}
          style={r2.style}
          className="mt-8 text-lg md:text-xl text-[#FAF5FF]/70 max-w-2xl mx-auto leading-relaxed"
        >
          Ricambi, accessori, abbigliamento tecnico e lifestyle selezionati per chi vive la moto
          come una passione vera. Curato da rider, per rider.
        </p>

        <div ref={r2.ref} style={r2.style} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 h-14 px-8 rounded-2xl bg-[#FF4D2E] text-white font-semibold text-base shadow-2xl shadow-[#FF4D2E]/30 hover:brightness-110 hover:-translate-y-0.5 transition-all"
          >
            Esplora lo shop
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 h-14 px-8 rounded-2xl bg-white/5 border border-white/10 text-[#FAF5FF] font-semibold text-base hover:bg-white/10 transition-all"
          >
            <Play className="w-4 h-4" />
            Guarda le stories
          </Link>
        </div>

        {/* Trust row */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[#FAF5FF]/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E5C7]" />
            <span>Spedizioni in 24/48h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
            <span>Resi gratuiti entro 30gg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF4D2E]" />
            <span>Pagamenti sicuri Stripe</span>
          </div>
        </div>
      </div>
    </section>
  );
}