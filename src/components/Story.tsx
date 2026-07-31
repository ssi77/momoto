import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function Story() {
  const r = useReveal();
  return (
    <section className="py-20 md:py-32 bg-[#1a1f15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-[#272B24] border border-white/5">
            <img
              src="https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-132360a7a1-9dc0419e0a5a.jpg"
              alt="Momoto rider"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181D15]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
              <button
                aria-label="Play story"
                className="h-12 w-12 rounded-full bg-white text-[#181D15] flex items-center justify-center hover:scale-110 transition"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
              <div>
                <div className="text-xs text-[#A89CB5] uppercase tracking-wider">Story</div>
                <div className="text-sm font-semibold text-[#FAF5FF]">Una domenica con i Momoto Riders</div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#FFB800] uppercase tracking-wider mb-3">
              Le nostre stories
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#FAF5FF] mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Più di un ecommerce: un ecosistema per chi va in moto.
            </h2>
            <p className="text-lg text-[#A89CB5] leading-relaxed mb-4">
              Ogni settimana pubblichiamo guide all'acquisto, recensioni tecniche, racconti di viaggio e
              tutorial di manutenzione. Scritti da chi la moto la guida davvero.
            </p>
            <p className="text-lg text-[#A89CB5] leading-relaxed mb-8">
              Dall'ultima giacca touring alla scelta della catena per la tua enduro: qui trovi risposte oneste
              e prodotti che abbiamo testato in prima persona.
            </p>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-[#FF4D2E] text-white font-semibold hover:brightness-110 transition"
            >
              Esplora le stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}