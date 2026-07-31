import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const items = [
  { icon: Truck, title: 'Spedizione express', desc: '24/48h in tutta Italia' },
  { icon: RotateCcw, title: 'Resi gratuiti', desc: '30 giorni per cambiare idea' },
  { icon: Shield, title: 'Pagamenti sicuri', desc: 'Stripe encryption' },
  { icon: Headphones, title: 'Supporto 7/7', desc: 'Rider che ti rispondono' },
];

export default function Trust() {
  const r = useReveal();
  return (
    <section className="py-16 md:py-20 bg-[#181D15] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-2xl bg-[#FF4D2E]/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#FF4D2E]" />
                </div>
                <div className="text-sm font-bold text-[#FAF5FF]">{it.title}</div>
                <div className="text-xs text-[#A89CB5] mt-1">{it.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}