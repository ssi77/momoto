import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'Ricambi tecnici', to: '/shop' },
      { label: 'Abbigliamento', to: '/shop' },
      { label: 'Caschi & protezioni', to: '/shop' },
      { label: 'Lifestyle', to: '/shop' },
      { label: 'Gift card', to: '/shop' },
    ],
  },
  {
    title: 'Momoto',
    links: [
      { label: 'Chi siamo', to: '/' },
      { label: 'Stories', to: '/stories' },
      { label: 'Community', to: '/community' },
      { label: 'Diventa partner', to: '/' },
      { label: 'Lavora con noi', to: '/' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Spedizioni', to: '/' },
      { label: 'Resi e rimborsi', to: '/' },
      { label: 'Taglie e guide', to: '/stories' },
      { label: 'Contatti', to: '/' },
      { label: 'FAQ', to: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f120d] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-white/10 p-1.5">
                <img
                  src="https://pub-3a823b4a94e74f1c9bf9813f768ca0e7.r2.dev/builder/137/assets/ai-59133019fa.png"
                  alt="Momoto"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-bold text-[#FAF5FF] text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                Momoto
              </span>
            </Link>
            <p className="text-sm text-[#A89CB5] leading-relaxed max-w-sm mb-6">
              Il garage digitale per motociclisti. Ricambi, abbigliamento, accessori e stories. Curato da
              rider, per rider.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-[#FF4D2E] text-[#FAF5FF] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold text-[#FAF5FF] uppercase tracking-wider mb-4">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-[#A89CB5] hover:text-[#FF4D2E] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A89CB5]">
            © {new Date().getFullYear()} Momoto. Tutti i diritti riservati. P.IVA 12345678901
          </p>
          <div className="flex items-center gap-6 text-xs text-[#A89CB5]">
            <Link to="/" className="hover:text-[#FAF5FF]">Privacy</Link>
            <Link to="/" className="hover:text-[#FAF5FF]">Termini</Link>
            <Link to="/" className="hover:text-[#FAF5FF]">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}