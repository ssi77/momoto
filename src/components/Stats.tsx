import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 4);
            setValue(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, value };
}

function Stat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="text-center">
      <div
        ref={ref}
        className="text-5xl md:text-6xl font-bold text-[#FAF5FF] tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {v.toLocaleString('it-IT')}
        <span className="text-[#FF4D2E]">{suffix}</span>
      </div>
      <div className="text-sm text-[#A89CB5] mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 md:py-24 bg-[#1a1f15] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <Stat value={48} suffix="k+" label="Rider nella tribe" />
          <Stat value={1240} suffix="+" label="Articoli in catalogo" />
          <Stat value={96} suffix="%" label="Recensioni 5 stelle" />
          <Stat value={24} suffix="h" label="Spedizioni express" />
        </div>
      </div>
    </section>
  );
}