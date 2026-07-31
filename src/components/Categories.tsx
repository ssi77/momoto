import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const categories = [
  {
    name: 'Ricambi tecnici',
    description: 'Freni, gomme, filtri, catene',
    count: '1.240+ articoli',
    accent: '#FF4D2E',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-57bd575c66-c403676235cf.jpg',
  },
  {
    name: 'Abbigliamento tech',
    description: 'Tute, giacche, guanti certificati',
    count: '680+ articoli',
    accent: '#FFB800',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-068c10dc86-e1208f53c035.jpg',
  },
  {
    name: 'Caschi & protezioni',
    description: 'Integrali, modulari, cross',
    count: '320+ articoli',
    accent: '#00E5C7',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-09b645ccb5-c050d946ab50.jpg',
  },
  {
    name: 'Lifestyle & accessori',
    description: 'Borse, gadget, merchandising',
    count: '540+ articoli',
    accent: '#FF4D2E',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-7dc34823e5-dd8c3a0af264.jpg',
  },
];

export default function Categories() {
  const reveal = useReveal();
  return (
    <section className="py-20 md:py-32 bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={reveal.ref} style={reveal.style} className="text-center mb-14">
          <p className="text-sm font-semibold text-[#FF4D2E] uppercase tracking-wider mb-3">
            Categorie
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FAF5FF]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tutto per la tua due ruote
          </h2>
          <p className="text-lg text-[#A89CB5] max-w-2xl mx-auto mt-4">
            Una selezione curata, divisa per passione. Parti tecniche, sicurezza e stile in un unico garage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <Link
              to="/shop"
              key={c.name}
              className="group relative rounded-3xl overflow-hidden bg-[#272B24] border border-white/5 hover:-translate-y-1 transition-all duration-500"
              style={{
                opacity: 0,
                animation: `fadeUp 0.7s ease forwards`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="aspect-square overflow-hidden bg-[#1a1f15]">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#181D15] via-[#181D15]/40 to-transparent" />
              <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-[#181D15]/80 backdrop-blur flex items-center justify-center text-[#FAF5FF] group-hover:bg-[#FF4D2E] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2"
                  style={{ background: `${c.accent}20`, color: c.accent }}
                >
                  {c.count}
                </div>
                <h3 className="text-lg font-bold text-[#FAF5FF]" style={{ fontFamily: 'var(--font-display)' }}>
                  {c.name}
                </h3>
                <p className="text-sm text-[#FAF5FF]/70 mt-1">{c.description}</p>
              </div>
            </Link>
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