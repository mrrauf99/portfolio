import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Calendar } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import FloatingOrbs from '../ui/FloatingOrbs';
import { experiences } from '../../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="relative section-padding overflow-hidden bg-[#080812]">
      <FloatingOrbs count={2} />
      <div className="dot-pattern absolute inset-0 opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="My Journey"
          subtitle="Real-world experience building software across multiple domains and technology stacks."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-cyan-500/40 to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative pl-16 md:pl-24 mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-3 md:left-5.5 top-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 4 }}
                className="glass-card border border-white/5 hover:border-purple-500/20 rounded-2xl p-8 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Briefcase size={16} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">{exp.role}</h3>
                    </div>
                    <div className="flex items-center gap-2 ml-10">
                      <span className="text-purple-400 font-display font-semibold text-sm">
                        {exp.company}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-slate-500 text-xs font-display">{exp.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-slate-400 text-xs font-display whitespace-nowrap">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed mb-6 text-sm">{exp.description}</p>

                {/* Achievements */}
                <ul className="space-y-2.5 mb-6">
                  {exp.achievements.map((achievement, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.08 }}
                      className="flex items-start gap-2 text-slate-300 text-sm"
                    >
                      <ChevronRight size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <Badge key={tech} color="purple" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Experience;
