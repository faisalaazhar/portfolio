import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { AdminBadge, AdminModal, FormField, SaveButton } from "./AdminUI";

export default function Hero() {
  const { data, adminMode, updateSection } = usePortfolio();
  const { personal, statusLabels } = data;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(personal);

  const set = (field) => (val) => setDraft((d) => ({ ...d, [field]: val }));

  const save = () => {
    updateSection("personal", draft);
    setEditing(false);
  };

  const statusColors = {
    available: "bg-emerald-100 text-emerald-700",
    working: "bg-amber-100 text-amber-700",
    open: "bg-sky-100 text-sky-700",
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        {/* Background warm radial glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-terra/5 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] rounded-full bg-sand/60 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Text */}
          <div className="animate-fadeUp">
            {/* Status badge */}
            <span
              className={`inline-flex items-center text-[0.75rem] font-medium rounded-full px-3 py-1 mb-6 ${statusColors[personal.status] || statusColors.available}`}
            >
              {statusLabels[personal.status] || statusLabels.available}
            </span>

            <h1 className="font-serif text-5xl md:text-6xl text-bark leading-tight mb-4">
              Hi, I'm{" "}
              <em className="text-terra not-italic">{personal.shortName}</em>
            </h1>

            <p className="text-lg font-medium text-bark-light mb-3">
              {personal.title}
            </p>

            <p className="text-bark-light font-light leading-relaxed max-w-md mb-8 text-[0.95rem]">
              {personal.tagline}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#projects"
                className="px-6 py-3 bg-terra text-white rounded-lg text-sm font-medium hover:bg-bark transition-all hover:-translate-y-0.5 shadow-sm"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-sand text-bark-light rounded-lg text-sm font-medium hover:bg-sand hover:text-bark transition-all"
              >
                Get in touch
              </a>
              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-terra/40 text-terra rounded-lg text-sm font-medium hover:bg-terra hover:text-white transition-all flex items-center gap-2"
                >
                  <Download size={15} />
                  Download CV
                </a>
              )}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-sand text-bark-light rounded-lg text-sm font-medium hover:bg-sand hover:text-bark transition-all flex items-center gap-2"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>

            {/* Quick contact pills */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-[0.8rem] text-bark-muted hover:text-terra transition-colors"
              >
                <Mail size={13} />
                {personal.email}
              </a>
              <span className="text-sand">|</span>
              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-2 text-[0.8rem] text-bark-muted hover:text-terra transition-colors"
              >
                <Phone size={13} />
                {personal.phone}
              </a>
            </div>
          </div>

          {/* Photo / avatar */}
          <div
            className="flex justify-center items-center"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative w-72 h-80 md:w-80 md:h-96">
              {/* Decorative rotated card behind */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-sand to-terra/20 rotate-3" />
              {/* Main photo card */}
              <div className="absolute inset-2 rounded-[2.8rem] overflow-hidden bg-cream flex items-center justify-center border border-sand/60">
                <img
                  src={personal.image}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback avatar */}
                <div className="hidden flex-col items-center justify-center gap-3 w-full h-full">
                  <div className="text-7xl">👨‍💻</div>
                  <p className="font-serif italic text-bark-muted text-sm">
                    Add profile.jpg to /public/
                  </p>
                </div>
              </div>
              {/* Dot decoration */}
              <div className="absolute -bottom-4 -right-4 grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-terra/25"
                  />
                ))}
              </div>
              {/* Name card */}
              <div className="absolute -bottom-6 left-6 bg-white border border-sand rounded-xl px-4 py-2.5 shadow-lg">
                <p className="font-serif text-bark text-sm font-semibold">
                  {personal.name}
                </p>
                <p className="text-[0.7rem] text-bark-muted">
                  {personal.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin edit button */}
        {adminMode && (
          <AdminBadge
            onClick={() => {
              setDraft(personal);
              setEditing(true);
            }}
            label="Edit Hero"
          />
        )}
      </section>

      {/* Admin edit modal */}
      {editing && (
        <AdminModal
          title="Edit Hero / Personal Info"
          onClose={() => setEditing(false)}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              value={draft.name}
              onChange={set("name")}
            />
            <FormField
              label="Short Name"
              value={draft.shortName}
              onChange={set("shortName")}
            />
            <FormField
              label="Title"
              value={draft.title}
              onChange={set("title")}
            />
            <FormField
              label="Status"
              value={draft.status}
              onChange={set("status")}
            />
            <div className="col-span-2 text-[0.72rem] text-bark-muted bg-sand/40 rounded-lg p-2">
              Status options: <code>available</code> · <code>working</code> ·{" "}
              <code>open</code>
            </div>
            <div className="col-span-2">
              <FormField
                label="Tagline"
                value={draft.tagline}
                onChange={set("tagline")}
                rows={2}
              />
            </div>
            <div className="col-span-2">
              <FormField
                label="Bio (used in About section)"
                value={draft.bio}
                onChange={set("bio")}
                rows={5}
              />
            </div>
            <FormField
              label="Email"
              value={draft.email}
              onChange={set("email")}
            />
            <FormField
              label="Phone"
              value={draft.phone}
              onChange={set("phone")}
            />
            <FormField
              label="GitHub URL"
              value={draft.github}
              onChange={set("github")}
            />
            <FormField
              label="LinkedIn URL"
              value={draft.linkedin}
              onChange={set("linkedin")}
            />
            <FormField
              label="Location"
              value={draft.location}
              onChange={set("location")}
            />
            <FormField
              label="Image path (relative to /public)"
              value={draft.image}
              onChange={set("image")}
            />
          </div>
          <SaveButton onClick={save} />
        </AdminModal>
      )}
    </>
  );
}
