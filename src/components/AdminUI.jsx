import { Pencil } from 'lucide-react';

/**
 * Wraps any section content with an edit button when admin mode is on.
 * Usage: <AdminEditWrapper label="Edit Hero" onClick={() => setEditing(true)} />
 */
export function AdminEditButton({ onClick, label = 'Edit' }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-[0.72rem] font-medium text-white bg-terra hover:bg-bark transition-colors rounded-full px-3 py-1.5 shadow-md"
    >
      <Pencil size={11} />
      {label}
    </button>
  );
}

/**
 * A floating badge shown on sections when in admin mode.
 */
export function AdminBadge({ onClick, label }) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <AdminEditButton onClick={onClick} label={label} />
    </div>
  );
}

/**
 * Simple modal shell for admin edit panels.
 */
export function AdminModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center bg-bark/50 backdrop-blur-sm overflow-y-auto py-10 px-4">
      <div className="bg-cream rounded-2xl border border-sand shadow-2xl w-full max-w-2xl animate-fadeUp">
        <div className="flex items-center justify-between px-7 py-5 border-b border-sand">
          <h2 className="font-serif text-xl text-bark">{title}</h2>
          <button onClick={onClose} className="text-bark-muted hover:text-terra text-2xl leading-none">&times;</button>
        </div>
        <div className="px-7 py-6">{children}</div>
      </div>
    </div>
  );
}

/** Styled label + input/textarea combo for admin forms */
export function FormField({ label, type = 'text', value, onChange, rows }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.72rem] font-medium uppercase tracking-widest text-bark-muted">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-sand bg-white text-bark text-sm outline-none focus:border-terra transition-colors resize-vertical"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-sand bg-white text-bark text-sm outline-none focus:border-terra transition-colors"
        />
      )}
    </div>
  );
}

export function SaveButton({ onClick, children = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 px-6 py-2.5 bg-terra text-white rounded-lg text-sm font-medium hover:bg-bark transition-colors"
    >
      {children}
    </button>
  );
}
