import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useReveal } from '../hooks/useReveal';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  const { data } = usePortfolio();
  const { personal } = data;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const ref1 = useReveal();
  const ref2 = useReveal();

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Opens default mail client with pre-filled content
  const handleSubmit = () => {
    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject || 'Portfolio enquiry')}&body=${encodeURIComponent(`Hi ${personal.shortName},\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`)}`;
    window.open(mailto);
    setSent(true);
  };

  const contactItems = [
    { icon: <Mail size={17} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone size={17} />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: <MapPin size={17} />, label: 'Location', value: personal.location, href: null },
    { icon: <Github size={17} />, label: 'GitHub', value: 'github.com/faisalaazhar', href: personal.github },
    { icon: <Linkedin size={17} />, label: 'LinkedIn', value: 'Connect on LinkedIn', href: personal.linkedin },
  ];

  return (
    <section id="contact" className="relative py-24 bg-cream overflow-hidden">
      {/* Background blob */}
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-sand/60 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-start relative">
        {/* Left */}
        <div ref={ref1} className="reveal">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra mb-3">Get in Touch</p>
          <h2 className="font-serif text-4xl text-bark mb-5 leading-snug">
            Let's build something <em className="not-italic text-terra">together.</em>
          </h2>
          <p className="text-bark-light font-light leading-relaxed mb-8 text-[0.95rem] max-w-md">
            Whether you have a project in mind, a job opportunity, or just want to say hello — my inbox is always open.
          </p>

          <div className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-sand flex items-center justify-center text-bark-light group-hover:bg-terra/15 group-hover:text-terra transition-all duration-200 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[0.7rem] text-bark-muted uppercase tracking-widest font-medium">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="text-[0.88rem] text-bark-light hover:text-terra transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[0.88rem] text-bark-light">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div ref={ref2} className="reveal">
          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="font-serif text-xl text-bark mb-2">Your mail client is opening!</h3>
              <p className="text-bark-muted text-sm">If it didn't open, email me directly at <a href={`mailto:${personal.email}`} className="text-terra underline">{personal.email}</a></p>
              <button onClick={() => setSent(false)} className="mt-4 text-sm text-terra hover:underline">Send another</button>
            </div>
          ) : (
            <div className="bg-white border border-sand rounded-2xl p-7 shadow-sm flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.7rem] uppercase tracking-widest text-bark-muted font-medium">Name</label>
                  <input value={form.name} onChange={set('name')} placeholder="Jane Smith"
                    className="px-3 py-2.5 rounded-lg border border-sand bg-cream text-bark text-sm outline-none focus:border-terra transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.7rem] uppercase tracking-widest text-bark-muted font-medium">Email</label>
                  <input value={form.email} onChange={set('email')} placeholder="jane@example.com" type="email"
                    className="px-3 py-2.5 rounded-lg border border-sand bg-cream text-bark text-sm outline-none focus:border-terra transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.7rem] uppercase tracking-widest text-bark-muted font-medium">Subject</label>
                <input value={form.subject} onChange={set('subject')} placeholder="Job opportunity / Project enquiry..."
                  className="px-3 py-2.5 rounded-lg border border-sand bg-cream text-bark text-sm outline-none focus:border-terra transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.7rem] uppercase tracking-widest text-bark-muted font-medium">Message</label>
                <textarea value={form.message} onChange={set('message')} rows={5} placeholder="Tell me about your project or opportunity..."
                  className="px-3 py-2.5 rounded-lg border border-sand bg-cream text-bark text-sm outline-none focus:border-terra transition-colors resize-none" />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.message}
                className="flex items-center justify-center gap-2 py-3 bg-terra text-white rounded-lg text-sm font-medium hover:bg-bark transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Send size={14} /> Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
