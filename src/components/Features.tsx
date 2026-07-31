import { Zap, Shield, Users, Award, Wrench, Heart } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const features = [
  {
    icon: Wrench,
    title: 'Selezione tecnica curata',
    desc: 'Ogni ricambio è scelto dal nostro team di meccanici e rider esperti. Mai prodotti a caso.',
  },
  {
    icon: Shield,
    title: 'Sicurezza certificata',
    desc: 'Solo caschi e protezioni con omologazione ECE, abbigliamento CE EN 17092.',
  },
  {
    icon: Zap,
    title: 'Spedizione lampo',
    desc: 'Ordini entro le 14:00 spediti in giornata. 24/48h in tutta Italia con tracciamento.',
  },
  {
    icon: Award,
    title: 'Brand premium only',
    desc: 'Distribuiamo solo marchi con cui andiamo in moto: Alpinestars, Dainese, Brembo, Akrapovic.',
  },
  {
    icon: Heart,
    title: 'Community reale',
    desc: 'Forum, gite, eventi. Non siamo solo un negozio, siamo una tribe di motociclisti.',
  },
  {
    icon: Users,
    title: 'Supporto rider-to-rider',
    desc: 'Il nostro customer care parla la tua lingua: tecnica, passione, zero fuffa.',
  },
];

export default function Features() {
  const r = useReveal();
  return (
    <section className="py-20 md:py-32 bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style} className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00E5C7] uppercase tracking-wider mb-3">
            Perché Momoto
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FAF5FF]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Più di un negozio. Una tribe.
          </h2>
          <p className="text-lg text-[#A89CB5] max-w-2xl mx-auto mt-4">
            Sei cose che ci rendono il garage digitale preferito dai motociclisti italiani.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            const palette = ['#FF4D2E', '#FFB800', '#00E5C7'];
            const accent = palette[i % 3];
            return (
              <div
                key={f.title}
                className="rounded-3xl bg-[#272B24] border border-white/5 p-6 md:p-8 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${accent}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <h3 className="text-lg font-bold text-[#FAF5FF] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {f.title}
                </h3>
                <p className="text-sm text-[#A89CB5] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}