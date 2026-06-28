import { motion } from 'framer-motion';
import { Briefcase, BookOpen, ChevronRight, Calendar } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import FloatingOrbs from '../ui/FloatingOrbs';
import { experiences } from '../../data/experience';

const roleIconMap = {
  1: Briefcase,
  2: BookOpen,
};

const roleColorMap = {
  purple: {
    dot: 'from-purple-500 to-cyan-500',
    iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    accent: 'text-purple-400',
    hover: 'hover:border-purple-500/20',
    badge: 'purple',
  },
  cyan: {
    dot: 'from-cyan-500 to-blue-500',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    accent: 'text-cyan-400',
    hover: 'hover:border-cyan-500/20',
    badge: 'cyan',
  },
};

const Experience = () => {
  return (
    <section id="experience" className="relative section-padding overflow-hidden bg-[#080812]">
      <FloatingOrbs count={2} />
      <div className="dot-pattern absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Experience & Education"
          subtitle="Real-world software development and the academic foundation behind it."
        />

        <div className="relative">

          <div className="absolute left-2 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-cyan-500/40 to-transparent" />

          {experiences.map((exp, i) => {
            const cm = roleColorMap[exp.color] || roleColorMap.purple;
            const RoleIcon = roleIconMap[exp.id] || Briefcase;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative pl-8 md:pl-24 mb-12 last:mb-0"
              >

                <div className={`absolute left-[-1.5px] md:left-[22.5px] top-1.5 w-5 h-5 rounded-full bg-gradient-to-br ${cm.dot} shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className={`glass-card border border-white/5 ${cm.hover} rounded-2xl p-5 md:p-8 transition-all duration-300 group`}
                >

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-start md:items-center gap-2 mb-1">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 md:mt-0 ${cm.iconBg}`}>
                          <RoleIcon size={16} aria-hidden="true" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold font-display text-white leading-tight">{exp.role}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 ml-10">
                        <span className={`font-display font-semibold text-sm ${cm.accent}`}>
                          {exp.company}
                        </span>
                        {exp.type !== 'Education' && (
                          <>
                            <span className="text-slate-600 text-xs">•</span>
                            <span className="text-slate-500 text-xs font-display">{exp.type}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-slate-400 text-xs font-display whitespace-nowrap">
                      <Calendar size={12} aria-hidden="true" />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-6 text-sm line-clamp-3 md:line-clamp-none">{exp.description}</p>

                  <ul className="space-y-2.5 mb-6" aria-label={`${exp.role} achievements`}>
                    {exp.achievements.map((achievement, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.08 }}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <ChevronRight size={14} className={`${cm.accent} mt-0.5 flex-shrink-0`} aria-hidden="true" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <Badge key={tech} color={cm.badge} size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
