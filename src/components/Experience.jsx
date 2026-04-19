import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useReveal } from '../hooks/useReveal';
import { AdminBadge, AdminModal, FormField, SaveButton } from './AdminUI';
import { Plus, Trash2, Pencil } from 'lucide-react';

const EMPTY_EXP = {
  id: '', role: '', company: '', location: '', period: '', bullets: [''],
};

function ExperienceCard({ exp, index, adminMode, onEdit, onDelete }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal relative group">
      <div className="flex gap-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-terra mt-1.5 ring-4 ring-terra/20 flex-shrink-0" />
          <div className="w-0.5 bg-sand flex-1 mt-2" />
        </div>
        {/* Card */}
        <div className="bg-white border border-sand rounded-2xl p-6 mb-6 flex-1 hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-serif text-xl text-bark mb-0.5">{exp.role}</h3>
              <p className="text-terra font-medium text-sm">{exp.company}</p>
              <p className="text-bark-muted text-[0.78rem] mt-0.5">{exp.location}</p>
            </div>
            <span className="bg-cream border border-sand text-bark-muted text-[0.72rem] font-medium px-3 py-1 rounded-full whitespace-nowrap">
              {exp.period}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[0.88rem] text-bark-light font-light leading-relaxed">
                <span className="text-terra mt-1 flex-shrink-0">▸</span>
                {b}
              </li>
            ))}
          </ul>
          {adminMode && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-sand">
              <button onClick={() => onEdit(exp)} className="flex items-center gap-1 text-[0.72rem] text-bark-muted hover:text-terra transition-colors">
                <Pencil size={11} /> Edit
              </button>
              <button onClick={() => onDelete(exp.id)} className="flex items-center gap-1 text-[0.72rem] text-bark-muted hover:text-red-500 transition-colors ml-2">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { data, adminMode, updateSection } = usePortfolio();
  const [editing, setEditing] = useState(null); // null | exp object
  const [isNew, setIsNew] = useState(false);
  const headerRef = useReveal();

  const openNew = () => {
    setEditing({ ...EMPTY_EXP, id: `exp-${Date.now()}` });
    setIsNew(true);
  };

  const openEdit = (exp) => {
    setEditing({ ...exp, bullets: [...exp.bullets] });
    setIsNew(false);
  };

  const save = () => {
    let updated;
    if (isNew) {
      updated = [editing, ...data.experience];
    } else {
      updated = data.experience.map((e) => (e.id === editing.id ? editing : e));
    }
    updateSection('experience', updated);
    setEditing(null);
  };

  const deleteExp = (id) => {
    updateSection('experience', data.experience.filter((e) => e.id !== id));
  };

  const setBullet = (i, val) => {
    const bullets = [...editing.bullets];
    bullets[i] = val;
    setEditing({ ...editing, bullets });
  };

  const addBullet = () => setEditing({ ...editing, bullets: [...editing.bullets, ''] });
  const removeBullet = (i) => setEditing({ ...editing, bullets: editing.bullets.filter((_, idx) => idx !== i) });

  return (
    <>
      <section id="experience" className="relative py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div ref={headerRef} className="reveal mb-14">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra mb-3">Work History</p>
            <h2 className="font-serif text-4xl text-bark leading-snug">Experience</h2>
          </div>

          <div>
            {data.experience.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                adminMode={adminMode}
                onEdit={openEdit}
                onDelete={deleteExp}
              />
            ))}
          </div>

          {adminMode && (
            <button
              onClick={openNew}
              className="flex items-center gap-2 text-sm text-terra border border-terra/30 rounded-full px-4 py-2 hover:bg-terra/10 transition-colors mt-4"
            >
              <Plus size={15} /> Add Experience
            </button>
          )}
        </div>

        {adminMode && <AdminBadge onClick={openNew} label="Add Experience" />}
      </section>

      {editing && (
        <AdminModal title={isNew ? 'Add Experience' : 'Edit Experience'} onClose={() => setEditing(null)}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Role / Title" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <FormField label="Company" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
              <FormField label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
              <FormField label="Period (e.g. Jan 2023 – Present)" value={editing.period} onChange={(v) => setEditing({ ...editing, period: v })} />
            </div>
            <div>
              <label className="text-[0.72rem] font-medium uppercase tracking-widest text-bark-muted block mb-2">Bullet Points</label>
              {editing.bullets.map((b, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={b}
                    onChange={(e) => setBullet(i, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-sand bg-white text-bark text-sm outline-none focus:border-terra transition-colors"
                  />
                  <button onClick={() => removeBullet(i)} className="text-bark-muted hover:text-red-500 transition-colors px-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button onClick={addBullet} className="text-[0.78rem] text-terra hover:underline flex items-center gap-1 mt-1">
                <Plus size={12} /> Add bullet
              </button>
            </div>
            <SaveButton onClick={save} />
          </div>
        </AdminModal>
      )}
    </>
  );
}
