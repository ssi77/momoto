import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function CTA() {
  const r = useReveal();
  return (
    <section className="py-20 md:py-32 bg-[#181D15]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div ref={r.ref} style={r.style}>
          <h2
            className="text-4xl md:text-6xl font-bold text-[#FAF5FF] tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pronti a
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #FF4D2E 0%, #FFB800 50%, #00E5C7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              accendere il motore?
            </span>
          </h2>
          <p className="text-lg text-[#A89CB5] max-w-xl mx-auto mt-6 mb-10">
            Unisciti a 48.000 motociclisti che hanno già scelto Momoto come loro garage digitale.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 h-14 px-8 rounded-2xl bg-[#FF4D2E] text-white font-semibold shadow-2xl shadow-[#FF4D2E]/30 hover:brightness-110 hover:-translate-y-0.5 transition-all"
          >
            Inizia lo shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}