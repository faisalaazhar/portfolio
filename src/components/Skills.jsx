import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useReveal } from '../hooks/useReveal';
import { AdminBadge, AdminModal, FormField, SaveButton } from './AdminUI';
import { Plus, Trash2, Pencil } from 'lucide-react';

const EMPTY_GROUP = { id: '', category: '', emoji: '🧩', items: [] };

function SkillGroup({ group, index, adminMode, onEdit, onDelete }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal">
      <div className="bg-cream/60 border border-sand rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{group.emoji}</span>
            <h3 className="font-serif italic text-bark text-lg">{group.category}</h3>
          </div>
          {adminMode && (
            <div className="flex gap-2">
              <button onClick={() => onEdit(group)} className="text-bark-muted hover:text-terra transition-colors"><Pencil size={14} /></button>
              <button onClick={() => onDelete(group.id)} className="text-bark-muted hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {group.items.map((skill) => (
            <span
              key={skill}
              className="bg-white border border-sand text-bark-light text-[0.8rem] font-medium px-3 py-1.5 rounded-full hover:border-terra hover:text-terra hover:bg-terra/5 transition-all duration-150 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { data, adminMode, updateSection } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const headerRef = useReveal();

  const openNew = () => {
    setEditing({ ...EMPTY_GROUP, id: `sk-${Date.now()}`, items: [] });
    setIsNew(true);
  };

  const save = () => {
    const itemsArr = typeof editing.items === 'string'
      ? editing.items.split(',').map((s) => s.trim()).filter(Boolean)
      : editing.items;
    const group = { ...editing, items: itemsArr };
    const updated = isNew
      ? [...data.skills, group]
      : data.skills.map((g) => (g.id === group.id ? group : g));
    updateSection('skills', updated);
    setEditing(null);
  };

  const del = (id) => updateSection('skills', data.skills.filter((g) => g.id !== id));
  const set = (field) => (val) => setEditing((e) => ({ ...e, [field]: val }));

  return (
    <>
      <section id="skills" className="relative py-24 bg-bark text-cream">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-terra/5 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div ref={headerRef} className="reveal mb-14">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra-light mb-3">Expertise</p>
            <h2 className="font-serif text-4xl text-cream mb-4">Technical Skills</h2>
            <p className="text-cream/60 font-light max-w-md text-[0.95rem] leading-relaxed">
              A broad toolkit built across university projects, professional work, and personal exploration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.skills.map((g, i) => (
              <SkillGroup key={g.id} group={g} index={i} adminMode={adminMode} onEdit={(g) => { setEditing({ ...g, items: g.items.join(', ') }); setIsNew(false); }} onDelete={del} />
            ))}
          </div>

          {adminMode && (
            <button onClick={openNew} className="flex items-center gap-2 text-sm text-terra-light border border-terra/30 rounded-full px-4 py-2 hover:bg-terra/10 transition-colors mt-8">
              <Plus size={15} /> Add Skill Group
            </button>
          )}
        </div>

        {adminMode && <AdminBadge onClick={openNew} label="Add Skill Group" />}
      </section>

      {editing && (
        <AdminModal title={isNew ? 'Add Skill Group' : 'Edit Skill Group'} onClose={() => setEditing(null)}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category Name" value={editing.category} onChange={set('category')} />
              <FormField label="Emoji" value={editing.emoji} onChange={set('emoji')} />
            </div>
            <FormField label="Skills (comma-separated)" value={editing.items} onChange={set('items')} rows={3} />
            <SaveButton onClick={save} />
          </div>
        </AdminModal>
      )}
    </>
  );
}
