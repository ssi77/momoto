import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const stories = [
  {
    title: 'Come scegliere il casco perfetto per la tua guida',
    excerpt: 'Integrale, modulare o jet? La guida definitiva per non sbagliare.',
    category: 'Guide',
    readTime: '8 min',
    accent: '#FF4D2E',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-8fb3108da3-3688ff8475fb.jpg',
  },
  {
    title: 'Tour della Sardegna in 7 giorni: il nostro itinerario',
    excerpt: 'Strade mozzafiato, bivacchi selvaggi e la migliore pasta della vita.',
    category: 'Viaggi',
    readTime: '12 min',
    accent: '#FFB800',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-edef4df77b-8a6803ef219f.jpg',
  },
  {
    title: 'Manutenzione fai da te: catena, freni e gomme',
    excerpt: 'Tutorial passo-passo per chi vuole sporcarsi le mani in garage.',
    category: 'Tutorial',
    readTime: '15 min',
    accent: '#00E5C7',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-7daeb6bcb9-3fa0267119d1.jpg',
  },
  {
    title: 'I 10 accessori che ogni rider dovrebbe avere',
    excerpt: 'Dalla action cam al kit di primo soccorso: la nostra top 10.',
    category: 'Lifestyle',
    readTime: '6 min',
    accent: '#FF4D2E',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-7b101cc3f8-00b872133c4c.jpg',
  },
  {
    title: 'Intervista a Marco V., Dakar finisher 2024',
    excerpt: 'La storia di un rider italiano che ha corso la Dakar in sella alla sua Africa Twin.',
    category: 'Interviste',
    readTime: '10 min',
    accent: '#FFB800',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-dfd853c78e-5112e62b39d3.jpg',
  },
  {
    title: 'Pneumatici: quando cambiarli e come sceglierli',
    excerpt: 'Tutto quello che devi sapere per non finire mai a piedi.',
    category: 'Tecnica',
    readTime: '7 min',
    accent: '#00E5C7',
    image: 'https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-f77ec6d564-bb6fa441644a.jpg',
  },
];

export default function StoriesPage() {
  const r = useReveal();
  return (
    <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style} className="mb-12">
          <p className="text-sm font-semibold text-[#00E5C7] uppercase tracking-wider mb-3">Stories</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF5FF] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Storie su due ruote
          </h1>
          <p className="text-lg text-[#A89CB5] max-w-2xl">
            Guide tecniche, racconti di viaggio, tutorial e interviste. Scritti da chi la moto la vive davvero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <article
              key={s.title}
              className="group rounded-3xl bg-[#272B24] border border-white/5 overflow-hidden hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#1a1f15]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${s.accent}20`, color: s.accent }}
                  >
                    <Tag className="w-3 h-3" />
                    {s.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#A89CB5]">
                    <Clock className="w-3 h-3" />
                    {s.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#FAF5FF] mb-2 group-hover:text-[#FF4D2E] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {s.title}
                </h2>
                <p className="text-sm text-[#A89CB5] leading-relaxed mb-4">{s.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF4D2E]">
                  Leggi <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-[#FF4D2E] text-white font-semibold hover:brightness-110 transition"
          >
            Esplora lo shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}