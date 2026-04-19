import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useReveal } from '../hooks/useReveal';
import { AdminBadge, AdminModal, FormField, SaveButton } from './AdminUI';
import { Github, ExternalLink, Plus, Trash2, Pencil } from 'lucide-react';

const EMPTY_PROJECT = {
  id: '', name: '', year: '', tag: '', emoji: '💡',
  color: 'from-amber-50 to-orange-100',
  description: '', stack: [], github: '', live: '',
};

function ProjectCard({ project, adminMode, onEdit, onDelete }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal">
      <div className="bg-white border border-sand rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Thumb */}
        <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center text-5xl`}>
          {project.emoji}
        </div>
        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-terra">{project.tag}</span>
            <span className="text-[0.7rem] text-bark-muted">{project.year}</span>
          </div>
          <h3 className="font-serif text-xl text-bark mb-2">{project.name}</h3>
          <p className="text-[0.85rem] text-bark-muted font-light leading-relaxed mb-4 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((s) => (
              <span key={s} className="text-[0.7rem] bg-cream border border-sand text-bark-light rounded-full px-2.5 py-0.5">
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-auto">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[0.78rem] text-bark-light hover:text-terra transition-colors">
                <Github size={13} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[0.78rem] text-bark-light hover:text-terra transition-colors">
                <ExternalLink size={13} /> Live
              </a>
            )}
          </div>
          {adminMode && (
            <div className="flex gap-3 mt-3 pt-3 border-t border-sand">
              <button onClick={() => onEdit(project)} className="flex items-center gap-1 text-[0.72rem] text-bark-muted hover:text-terra">
                <Pencil size={11} /> Edit
              </button>
              <button onClick={() => onDelete(project.id)} className="flex items-center gap-1 text-[0.72rem] text-bark-muted hover:text-red-500">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { data, adminMode, updateSection } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const headerRef = useReveal();

  const openNew = () => {
    setEditing({ ...EMPTY_PROJECT, id: `proj-${Date.now()}`, stack: [] });
    setIsNew(true);
  };

  const save = () => {
    const stackArr = typeof editing.stack === 'string'
      ? editing.stack.split(',').map((s) => s.trim()).filter(Boolean)
      : editing.stack;
    const proj = { ...editing, stack: stackArr };
    const updated = isNew
      ? [proj, ...data.projects]
      : data.projects.map((p) => (p.id === proj.id ? proj : p));
    updateSection('projects', updated);
    setEditing(null);
  };

  const del = (id) => updateSection('projects', data.projects.filter((p) => p.id !== id));

  const set = (field) => (val) => setEditing((e) => ({ ...e, [field]: val }));

  return (
    <>
      <section id="projects" className="relative py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div ref={headerRef} className="reveal flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-terra mb-3">Selected Work</p>
              <h2 className="font-serif text-4xl text-bark">Projects</h2>
            </div>
            <a href="https://github.com/faisalaazhar" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-bark-light border border-sand rounded-full px-4 py-2 hover:bg-sand transition-colors">
              <Github size={14} /> View all on GitHub
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((p) => (
              <ProjectCard key={p.id} project={p} adminMode={adminMode} onEdit={(p) => { setEditing({ ...p, stack: p.stack.join(', ') }); setIsNew(false); }} onDelete={del} />
            ))}
          </div>

          {adminMode && (
            <button onClick={openNew} className="flex items-center gap-2 text-sm text-terra border border-terra/30 rounded-full px-4 py-2 hover:bg-terra/10 transition-colors mt-8">
              <Plus size={15} /> Add Project
            </button>
          )}
        </div>

        {adminMode && <AdminBadge onClick={openNew} label="Add Project" />}
      </section>

      {editing && (
        <AdminModal title={isNew ? 'Add Project' : 'Edit Project'} onClose={() => setEditing(null)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Project Name" value={editing.name} onChange={set('name')} />
            <FormField label="Year" value={editing.year} onChange={set('year')} />
            <FormField label="Tag (e.g. Full Stack)" value={editing.tag} onChange={set('tag')} />
            <FormField label="Emoji" value={editing.emoji} onChange={set('emoji')} />
            <FormField label="Color gradient class (Tailwind from-X to-Y)" value={editing.color} onChange={set('color')} />
            <FormField label="GitHub URL" value={editing.github} onChange={set('github')} />
            <FormField label="Live URL" value={editing.live} onChange={set('live')} />
            <div className="col-span-2">
              <FormField label="Description" value={editing.description} onChange={set('description')} rows={3} />
            </div>
            <div className="col-span-2">
              <FormField label="Tech Stack (comma-separated)" value={editing.stack} onChange={set('stack')} />
            </div>
          </div>
          <SaveButton onClick={save} />
        </AdminModal>
      )}
    </>
  );
}
