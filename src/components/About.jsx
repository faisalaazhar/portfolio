import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useReveal } from '../hooks/useReveal';
import { AdminBadge, AdminModal, FormField, SaveButton } from './AdminUI';

const INTEREST_EMOJIS = {
  'Travelling': '✈️', 'Cooking': '🍳', 'Reading tech news': '📰',
  'Watching anime': '🎌', 'Photography': '📷', 'Videography': '🎬',
  'Learning new skills': '🧠',
};

export default function About() {
  const { data, adminMode, updateSection } = usePortfolio();
  const { personal, interests } = data;
  const [editing, setEditing] = useState(false);
  const [draftBio, setDraftBio] = useState(personal.bio);
  const [draftInterests, setDraftInterests] = useState(interests.join(', '));

  const ref1 = useReveal();
  const ref2 = useReveal();

  const save = () => {
    updateSection('personal', { ...personal, bio: draftBio });
    updateSection('interests', draftInterests.split(',').map((s) => s.trim()).filter(Boolean));
    setEditing(false);
  };

  return (
    <>
      <section id="about" className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div ref={ref1} className="reveal">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra mb-3">About Me</p>
            <h2 className="font-serif text-4xl text-bark mb-6 leading-snug">
              A developer with a <em className="not-italic text-terra">human touch.</em>
            </h2>
            {personal.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-bark-light font-light leading-relaxed mb-4 text-[0.95rem]">
                {para}
              </p>
            ))}
          </div>

          {/* Right: quick facts + interests */}
          <div ref={ref2} className="reveal flex flex-col gap-8">
            {/* Location / availability cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📍', title: 'Based in', desc: personal.location },
                { icon: '🎓', title: 'Education', desc: 'MSc CS, UCB (ongoing)' },
                { icon: '💼', title: 'Experience', desc: '1.5+ years professional' },
                { icon: '🌐', title: 'Languages', desc: 'Bengali, English, Hindi' },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-cream rounded-2xl p-5 border border-sand hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-serif text-sm text-bark font-semibold mb-1">{f.title}</div>
                  <div className="text-[0.8rem] text-bark-muted leading-snug">{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra mb-3">Personal Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="flex items-center gap-1.5 bg-cream border border-sand rounded-full px-3 py-1.5 text-[0.8rem] text-bark-light"
                  >
                    <span>{INTEREST_EMOJIS[interest] || '⭐'}</span>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {adminMode && <AdminBadge onClick={() => { setDraftBio(personal.bio); setDraftInterests(interests.join(', ')); setEditing(true); }} label="Edit About" />}
      </section>

      {editing && (
        <AdminModal title="Edit About Section" onClose={() => setEditing(false)}>
          <div className="flex flex-col gap-4">
            <FormField label="Bio (use two newlines for new paragraph)" value={draftBio} onChange={setDraftBio} rows={8} />
            <FormField label="Interests (comma-separated)" value={draftInterests} onChange={setDraftInterests} />
            <SaveButton onClick={save} />
          </div>
        </AdminModal>
      )}
    </>
  );
}
