import { Star } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const testimonials = [
  {
    name: 'Marco V.',
    role: 'Rider touring · Multistrada',
    initial: 'M',
    color: '#FF4D2E',
    quote:
      'Dopo 8 anni su Amazon sono approdato a Momoto. Cambiamento di vita. Selezione impeccabile, supporto vero, e un packaging che ti fa capire che dietro c\'è passione.',
  },
  {
    name: 'Giulia P.',
    role: 'Track day lover · R6',
    initial: 'G',
    color: '#FFB800',
    quote:
      'Ho comprato tuta e guanti da Momoto. Il team mi ha consigliato via chat come un amico in pista, non come un call center. Spedizione in 24h. Top.',
  },
  {
    name: 'Andrea T.',
    role: 'Custom builder · Garage owner',
    initial: 'A',
    color: '#00E5C7',
    quote:
      'Per il mio atelier uso solo Momoto. Ricambi originali, prezzi onesti e zero fuffa. E quando ho un dubbio tecnico, rispondono quelli che sanno davvero.',
  },
];

export default function Testimonials() {
  const r = useReveal();
  return (
    <section className="py-20 md:py-32 bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style} className="text-center mb-14">
          <p className="text-sm font-semibold text-[#FF4D2E] uppercase tracking-wider mb-3">
            Dicono di noi
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FAF5FF]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            48.000 rider non possono sbagliarsi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-3xl bg-[#272B24] border border-white/5 p-6 md:p-8"
              style={{
                opacity: 0,
                animation: 'fadeUp 0.7s ease forwards',
                animationDelay: `${i * 120}ms`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <p className="text-[#FAF5FF]/90 leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#FAF5FF]">{t.name}</div>
                  <div className="text-xs text-[#A89CB5]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}