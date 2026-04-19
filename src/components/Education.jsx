import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useReveal } from '../hooks/useReveal';
import { AdminBadge, AdminModal, FormField, SaveButton } from './AdminUI';
import { Plus, Trash2, Pencil } from 'lucide-react';

const EMPTY_EDU = { id: '', degree: '', institution: '', location: '', period: '', details: '' };

function EduCard({ edu, adminMode, onEdit, onDelete }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal">
      <div className="bg-white border border-sand rounded-2xl p-6 hover:shadow-md transition-shadow duration-200 relative">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-serif text-xl text-bark mb-0.5">{edu.degree}</h3>
            <p className="text-terra font-medium text-sm">{edu.institution}</p>
            <p className="text-bark-muted text-[0.78rem] mt-0.5">{edu.location}</p>
          </div>
          <span className="bg-cream border border-sand text-bark-muted text-[0.72rem] font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {edu.period}
          </span>
        </div>
        {edu.details && (
          <p className="text-[0.86rem] text-bark-light font-light leading-relaxed">{edu.details}</p>
        )}
        {adminMode && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-sand">
            <button onClick={() => onEdit(edu)} className="flex items-center gap-1 text-[0.72rem] text-bark-muted hover:text-terra transition-colors">
              <Pencil size={11} /> Edit
            </button>
            <button onClick={() => onDelete(edu.id)} className="flex items-center gap-1 text-[0.72rem] text-bark-muted hover:text-red-500 transition-colors">
              <Trash2 size={11} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const { data, adminMode, updateSection } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const headerRef = useReveal();

  const openNew = () => { setEditing({ ...EMPTY_EDU, id: `edu-${Date.now()}` }); setIsNew(true); };

  const save = () => {
    const updated = isNew
      ? [editing, ...data.education]
      : data.education.map((e) => (e.id === editing.id ? editing : e));
    updateSection('education', updated);
    setEditing(null);
  };

  const del = (id) => updateSection('education', data.education.filter((e) => e.id !== id));
  const set = (field) => (val) => setEditing((e) => ({ ...e, [field]: val }));

  return (
    <>
      <section id="education" className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div ref={headerRef} className="reveal mb-14">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra mb-3">Academic Background</p>
            <h2 className="font-serif text-4xl text-bark">Education</h2>
          </div>

          <div className="flex flex-col gap-5">
            {data.education.map((edu) => (
              <EduCard key={edu.id} edu={edu} adminMode={adminMode} onEdit={(e) => { setEditing(e); setIsNew(false); }} onDelete={del} />
            ))}
          </div>

          {adminMode && (
            <button onClick={openNew} className="flex items-center gap-2 text-sm text-terra border border-terra/30 rounded-full px-4 py-2 hover:bg-terra/10 transition-colors mt-8">
              <Plus size={15} /> Add Education
            </button>
          )}
        </div>

        {adminMode && <AdminBadge onClick={openNew} label="Add Education" />}
      </section>

      {editing && (
        <AdminModal title={isNew ? 'Add Education' : 'Edit Education'} onClose={() => setEditing(null)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Degree" value={editing.degree} onChange={set('degree')} />
            <FormField label="Institution" value={editing.institution} onChange={set('institution')} />
            <FormField label="Location" value={editing.location} onChange={set('location')} />
            <FormField label="Period" value={editing.period} onChange={set('period')} />
            <div className="col-span-2">
              <FormField label="Details / Modules" value={editing.details} onChange={set('details')} rows={3} />
            </div>
          </div>
          <SaveButton onClick={save} />
        </AdminModal>
      )}
    </>
  );
}
