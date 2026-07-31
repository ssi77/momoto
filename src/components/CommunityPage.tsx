import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const events = [
  {
    date: '15',
    month: 'NOV',
    title: 'Momoto Ride Milano → lago di Como',
    location: 'Piazzale Lotto, Milano',
    attendees: 42,
  },
  {
    date: '22',
    month: 'NOV',
    title: 'Track day Misano – livello base',
    location: 'Misano World Circuit',
    attendees: 18,
  },
  {
    date: '06',
    month: 'DIC',
    title: 'Workshop: manutenzione invernale',
    location: 'Momoto Garage, Bologna',
    attendees: 12,
  },
  {
    date: '20',
    month: 'DIC',
    title: 'Panettone ride natalizio',
    location: 'Piazza Castello, Torino',
    attendees: 64,
  },
];

export default function CommunityPage() {
  const r = useReveal();
  return (
    <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-[#181D15]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style} className="text-center mb-16">
          <p className="text-sm font-semibold text-[#FFB800] uppercase tracking-wider mb-3">Community</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF5FF] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            La tribe dei Momoto Riders
          </h1>
          <p className="text-lg text-[#A89CB5] max-w-2xl mx-auto">
            Gite, track day, workshop, apericena. Entra a far parte di una community vera, non di un like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {[
            { num: '48k+', label: 'Rider iscritti' },
            { num: '24', label: 'Eventi annuali' },
            { num: '120+', label: 'Città attive' },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl bg-[#272B24] border border-white/5 p-6 text-center">
              <div className="text-4xl font-bold text-[#FF4D2E]" style={{ fontFamily: 'var(--font-display)' }}>{s.num}</div>
              <div className="text-sm text-[#A89CB5] mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF5FF] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Prossimi eventi
        </h2>

        <div className="space-y-3">
          {events.map((e) => (
            <div
              key={e.title}
              className="group flex items-center gap-4 p-4 md:p-6 rounded-3xl bg-[#272B24] border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-[#FF4D2E] to-[#FFB800] flex flex-col items-center justify-center text-white">
                <div className="text-xl md:text-2xl font-bold leading-none" style={{ fontFamily: 'var(--font-display)' }}>{e.date}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-1">{e.month}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-[#FAF5FF] group-hover:text-[#FF4D2E] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {e.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-[#A89CB5]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {e.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {e.attendees} partecipanti
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Iscrizioni aperte
                  </span>
                </div>
              </div>
              <button
                aria-label="Iscriviti"
                className="hidden md:inline-flex h-10 w-10 rounded-full bg-white/5 group-hover:bg-[#FF4D2E] text-[#FAF5FF] items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}