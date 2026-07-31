import { useState, FormEvent } from 'react';
import { Mail, Instagram, Youtube, Music2, Send, MapPin } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const contactItems = [
  { Icon: Mail, label: 'Email', value: 'ciao@momoto.it', href: 'mailto:ciao@momoto.it' },
  { Icon: Instagram, label: 'Instagram', value: '@momoto_official', href: 'https://instagram.com/momoto_official' },
  { Icon: Youtube, label: 'YouTube', value: 'Momoto Garage', href: 'https://youtube.com' },
  { Icon: Music2, label: 'TikTok', value: '@momoto.it', href: 'https://tiktok.com' },
];

const subjectOptions = [
  'Domanda su un prodotto',
  'Assistenza ordine',
  'Partnership / Brand',
  'Altro',
];

type Errors = { nome?: string; email?: string; messaggio?: string };

export default function Contact() {
  const r = useReveal();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oggetto, setOggetto] = useState(subjectOptions[0]);
  const [messaggio, setMessaggio] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!nome.trim()) e.nome = 'Inserisci il tuo nome.';
    if (!email.trim()) e.email = 'Inserisci la tua email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email non valida.';
    if (!messaggio.trim()) e.messaggio = 'Scrivi un messaggio.';
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
    setNome('');
    setEmail('');
    setOggetto(subjectOptions[0]);
    setMessaggio('');
  };

  return (
    <section id="contattaci" className="bg-[#181D15] py-[60px] md:py-[100px]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div ref={r.ref} style={r.style}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* LEFT — Contact info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4D2E]/10 mb-5">
                <MapPin className="w-3.5 h-3.5 text-[#FF4D2E]" />
                <span className="text-xs font-bold text-[#FF4D2E] uppercase tracking-wider">Contattaci</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#FAF5FF] tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Parliamo di moto
              </h2>
              <p className="mt-4 text-lg text-[#A89CB5] max-w-md leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                Che sia un dubbio tecnico, una partnership o solo per dirci ciao — siamo qui.
              </p>

              <ul className="mt-10 space-y-5">
                {contactItems.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0, 229, 199, 0.2)' }}
                    >
                      <Icon className="w-5 h-5 text-[#00E5C7]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#A89CB5] uppercase tracking-wider">{label}</p>
                      <a
                        href={href}
                        className="text-base md:text-lg font-semibold text-[#FAF5FF] hover:text-[#FF4D2E] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Decorative blob */}
              <div
                className="absolute -z-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FF4D2E 0%, transparent 70%)' }}
              />
            </div>

            {/* RIGHT — Form card */}
            <div
              className="bg-[#272B24] rounded-[24px] p-7 md:p-10 border border-white/5 relative"
              style={{ boxShadow: '0 20px 60px -20px rgba(255, 77, 46, 0.15), 0 8px 24px rgba(0,0,0,0.4)' }}
            >
              {submitted ? (
                <div className="py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'rgba(0, 229, 199, 0.2)' }}
                  >
                    <Send className="w-7 h-7 text-[#00E5C7]" />
                  </div>
                  <p
                    className="text-2xl md:text-3xl font-bold text-[#00E5C7]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Grazie!
                  </p>
                  <p className="mt-3 text-base text-[#A89CB5]" style={{ fontFamily: 'var(--font-body)' }}>
                    Ti rispondiamo entro 24h.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm font-semibold text-[#FF4D2E] hover:text-[#FFB800] transition-colors"
                  >
                    Invia un altro messaggio →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-5">
                    <label
                      htmlFor="contact-nome"
                      className="block text-xs font-semibold text-[#A89CB5] uppercase tracking-wider mb-2"
                    >
                      Nome *
                    </label>
                    <input
                      id="contact-nome"
                      type="text"
                      required
                      aria-required="true"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Mario Rossi"
                      className="w-full bg-[#181D15] border border-[#FAF5FF]/30 text-[#FAF5FF] rounded-xl px-[18px] py-[14px] outline-none transition focus:border-[#FF4D2E] focus:ring-4 focus:ring-[#FF4D2E]/20 placeholder:text-[#A89CB5]/60"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    {errors.nome && <p className="text-xs text-[#FF4D2E] mt-γ-1" style={{ marginTop: 6 }}>{errors.nome}</p>}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#A89CB5] uppercase tracking-wider mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mario@email.it"
                      className="w-full bg-[#181D15] border border-[#FAF5FF]/30 text-[#FAF5FF] rounded-xl px-[18px] py-[14px] outline-none transition focus:border-[#FF4D2E] focus:ring-4 focus:ring-[#FF4D2E]/20 placeholder:text-[#A89CB5]/60"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    {errors.email && <p className="text-xs text-[#FF4D2E]" style={{ marginTop: 6 }}>{errors.email}</p>}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="contact-oggetto"
                      className="block text-xs font-semibold text-[#A89CB5] uppercase tracking-wider mb-2"
                    >
                      Oggetto
                    </label>
                    <select
                      id="contact-oggetto"
                      value={oggetto}
                      onChange={(e) => setOggetto(e.target.value)}
                      className="w-full bg-[#181D15] border border-[#FAF5FF]/30 text-[#FAF5FF] rounded-xl px-[18px] py-[14px] outline-none transition focus:border-[#FF4D2E] focus:ring-4 focus:ring-[#FF4D2E]/20 appearance-none"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#181D15] text-[#FAF5FF]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-7">
                    <label
                      htmlFor="contact-messaggio"
                      className="block text-xs font-semibold text-[#A89CB5] uppercase tracking-wider mb-2"
                    >
                      Messaggio *
                    </label>
                    <textarea
                      id="contact-messaggio"
                      required
                      aria-required="true"
                      rows={5}
                      value={messaggio}
                      onChange={(e) => setMessaggio(e.target.value)}
                      placeholder="Raccontaci tutto..."
                      className="w-full bg-[#181D15] border border-[#FAF5FF]/30 text-[#FAF5FF] rounded-xl px-[18px] py-[14px] outline-none transition focus:border-[#FF4D2E] focus:ring-4 focus:ring-[#FF4D2E]/20 placeholder:text-[#A89CB5]/60 resize-none"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    {errors.messaggio && <p className="text-xs text-[#FF4D2E]" style={{ marginTop: 6 }}>{errors.messaggio}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#FF4D2E] text-[#FAF5FF] rounded-full px-8 py-4 uppercase tracking-wider font-bold hover:bg-[#FFB800] transition-all duration-300 shadow-lg shadow-[#FF4D2E]/30 hover:shadow-[#FFB800]/40 hover:-translate-y-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Invia messaggio
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}