import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const { data } = usePortfolio();
  const { personal } = data;

  return (
    <footer className="bg-bark py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-serif italic text-cream/70 text-lg mb-1">{personal.shortName}.dev</p>
          <p className="text-cream/30 text-[0.78rem]">© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-4">
          <a href={personal.github} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/10 transition-all">
            <Github size={16} />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/10 transition-all">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${personal.email}`}
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/10 transition-all">
            <Mail size={16} />
          </a>
        </div>

        <p className="text-cream/25 text-[0.72rem] w-full md:w-auto text-center md:text-right">
          Built with React + Tailwind CSS · Hosted on GitHub Pages
        </p>
      </div>
    </footer>
  );
}
