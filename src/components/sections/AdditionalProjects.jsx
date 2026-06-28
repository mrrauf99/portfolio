import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FloatingOrbs from '../ui/FloatingOrbs';
import { additionalProjects } from '../../data/projects';

const colorMap = {
  purple: {
    icon: 'bg-purple-500/10 border-purple-500/20',
    hover: 'hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]',
    tag: 'bg-purple-500/10 text-purple-300',
  },
  cyan: {
    icon: 'bg-cyan-500/10 border-cyan-500/20',
    hover: 'hover:border-cyan-500/30 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]',
    tag: 'bg-cyan-500/10 text-cyan-300',
  },
  emerald: {
    icon: 'bg-emerald-500/10 border-emerald-500/20',
    hover: 'hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]',
    tag: 'bg-emerald-500/10 text-emerald-300',
  },
  blue: {
    icon: 'bg-blue-500/10 border-blue-500/20',
    hover: 'hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]',
    tag: 'bg-blue-500/10 text-blue-300',
  },
};

const AdditionalProjectCard = ({ project, index }) => {
  const cm = colorMap[project.color] || colorMap.purple;

  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} on GitHub`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`glass-card border border-white/5 ${cm.hover} rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300`}
    >

      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl ${cm.icon} group-hover:scale-105 transition-transform`}>
          {project.icon}
        </div>
        <div className="p-2 rounded-lg text-slate-500 group-hover:text-white group-hover:bg-white/5 transition-all duration-200">
          <Github size={16} aria-hidden="true" />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-display font-bold text-white text-sm leading-tight mb-2 group-hover:text-purple-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 md:line-clamp-none">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className={`px-2 py-0.5 rounded-full text-xs font-display font-medium ${cm.tag}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
};

const AdditionalProjects = () => {
  return (
    <section id="other-projects" className="relative section-padding overflow-hidden bg-[#0a0a14]">
      <FloatingOrbs count={2} />
      <div className="dot-pattern absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Other Projects"
          title="More Things I've Built"
          subtitle="A curated collection of projects spanning desktop systems, tools, and web experiments, each one a learning milestone."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalProjects.map((project, index) => (
            <AdditionalProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/mrrauf99"
            target="_blank"
            rel="noopener noreferrer"
            id="see-all-projects-link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-200 font-display font-medium text-sm"
          >
            <Github size={16} aria-hidden="true" />
            See all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AdditionalProjects;
