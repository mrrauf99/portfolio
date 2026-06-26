import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ChevronRight, Star, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import FloatingOrbs from '../ui/FloatingOrbs';
import { featuredProjects } from '../../data/projects';

const colorMap = {
  purple: {
    gradient: 'from-purple-600/20 via-purple-500/10 to-transparent',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    glow: 'hover:shadow-[0_20px_60px_rgba(168,85,247,0.2)]',
    accent: 'text-purple-400',
    number: 'from-purple-500 to-purple-700',
    tag: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
    statBg: 'bg-purple-500/8 border-purple-500/15',
    statusBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    archBg: 'bg-purple-500/6 border-purple-500/10 text-purple-300/80',
  },
  cyan: {
    gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    glow: 'hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)]',
    accent: 'text-cyan-400',
    number: 'from-cyan-500 to-cyan-700',
    tag: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    statBg: 'bg-cyan-500/8 border-cyan-500/15',
    statusBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    archBg: 'bg-cyan-500/6 border-cyan-500/10 text-cyan-300/80',
  },
  emerald: {
    gradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)]',
    accent: 'text-emerald-400',
    number: 'from-emerald-500 to-emerald-700',
    tag: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    statBg: 'bg-emerald-500/8 border-emerald-500/15',
    statusBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    archBg: 'bg-emerald-500/6 border-emerald-500/10 text-emerald-300/80',
  },
  blue: {
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    glow: 'hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)]',
    accent: 'text-blue-400',
    number: 'from-blue-500 to-blue-700',
    tag: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    statBg: 'bg-blue-500/8 border-blue-500/15',
    statusBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    archBg: 'bg-blue-500/6 border-blue-500/10 text-blue-300/80',
  },
};

/** Right-panel: replaces the confusing fake progress bars with real project info */
const ProjectInfoPanel = ({ project, cm, hovered }) => (
  <motion.div
    animate={{ y: hovered ? -6 : 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="glass-card border border-white/8 rounded-xl p-6 mb-6"
    style={{ boxShadow: hovered ? `0 20px 40px ${project.glowColor}` : 'none' }}
  >
    {/* Header row — icon, title, status */}
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl leading-none">{project.icon}</span>
        <div>
          <div className="font-display font-bold text-white text-base leading-tight">
            {project.title}
          </div>
          <div className={`text-xs mt-0.5 ${cm.accent}`}>Featured Project</div>
        </div>
      </div>
      {/* Status badge */}
      <span
        className={`text-xs font-display font-semibold px-2.5 py-1 rounded-full border ${cm.statusBg}`}
      >
        {project.status}
      </span>
    </div>

    {/* Key stats grid */}
    <div className="grid grid-cols-3 gap-2 mb-5">
      {project.stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-lg border p-2.5 text-center ${cm.statBg}`}
        >
          <div className="font-display font-bold text-white text-sm leading-tight">
            {stat.value}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Architecture highlights */}
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Zap size={11} className={cm.accent} aria-hidden="true" />
        <span className="text-xs font-display uppercase tracking-wider text-slate-500">
          Architecture
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.architecture.map((item) => (
          <span
            key={item}
            className={`text-xs px-2.5 py-1 rounded-full border font-display ${cm.archBg}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const cm = colorMap[project.color];

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative glass-card border ${cm.border} ${cm.glow} rounded-2xl overflow-hidden transition-all duration-500 group`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cm.gradient} opacity-50`} aria-hidden="true" />

      {/* Featured badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${cm.tag} text-xs font-display font-semibold`}>
          <Star size={10} aria-hidden="true" />
          Featured
        </div>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-0">
        {/* ── Left — project number + info + actions ── */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            {/* Project number */}
            <div
              className={`text-7xl font-black font-display bg-gradient-to-br ${cm.number} bg-clip-text text-transparent opacity-20 select-none mb-4`}
              aria-hidden="true"
            >
              0{index + 1}
            </div>

            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" aria-hidden="true">{project.icon}</span>
              <h3 className="text-2xl font-bold font-display text-white">{project.title}</h3>
            </div>

            <p className="text-slate-400 leading-relaxed mb-6 text-sm">{project.description}</p>

            {/* Key highlights */}
            <ul className="space-y-2 mb-6" aria-label="Project highlights">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-slate-300">
                  <ChevronRight size={14} className={cm.accent} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-display font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-medium text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>

        {/* ── Right — info panel + tech stack ── */}
        <div className="p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5">
          <ProjectInfoPanel project={project} cm={cm} hovered={hovered} />

          {/* Tech stack */}
          <div>
            <p className="text-xs text-slate-500 font-display uppercase tracking-widest mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech} color={project.color} size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedProjects = () => {
  return (
    <section id="projects" className="relative section-padding overflow-hidden bg-[#080812]">
      <FloatingOrbs count={3} />
      <div className="dot-pattern absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects That Define Me"
          subtitle="A showcase of my most impactful projects: each one a story of problem-solving, creativity, and technical depth."
        />

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
