import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import FloatingOrbs from '../ui/FloatingOrbs';
import { skillCategories } from '../../data/skills';

const categoryColorMap = {
  purple: {
    tab: 'bg-purple-500/15 border-purple-500/40 text-purple-300',
    bar: 'from-purple-600 to-purple-400',
    border: 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    icon: 'bg-purple-500/10 border-purple-500/20',
    badge: 'hover:bg-purple-500/15 hover:border-purple-500/30 hover:text-purple-200 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)]',
  },
  cyan: {
    tab: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
    bar: 'from-cyan-600 to-cyan-400',
    border: 'hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    icon: 'bg-cyan-500/10 border-cyan-500/20',
    badge: 'hover:bg-cyan-500/15 hover:border-cyan-500/30 hover:text-cyan-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]',
  },
  emerald: {
    tab: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    bar: 'from-emerald-600 to-emerald-400',
    border: 'hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    icon: 'bg-emerald-500/10 border-emerald-500/20',
    badge: 'hover:bg-emerald-500/15 hover:border-emerald-500/30 hover:text-emerald-200 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]',
  },
  blue: {
    tab: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
    bar: 'from-blue-600 to-blue-400',
    border: 'hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    icon: 'bg-blue-500/10 border-blue-500/20',
    badge: 'hover:bg-blue-500/15 hover:border-blue-500/30 hover:text-blue-200 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]',
  },
  pink: {
    tab: 'bg-pink-500/15 border-pink-500/40 text-pink-300',
    bar: 'from-pink-600 to-pink-400',
    border: 'hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
    icon: 'bg-pink-500/10 border-pink-500/20',
    badge: 'hover:bg-pink-500/15 hover:border-pink-500/30 hover:text-pink-200 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)]',
  },
};

/** Derive a readable proficiency label from the numeric level */
const getProficiencyLabel = (level) => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 70) return 'Proficient';
  return 'Familiar';
};

const SkillCard = ({ skill, categoryColor, index }) => {
  const cm = categoryColorMap[categoryColor];
  const label = getProficiencyLabel(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`glass-card border border-white/5 p-5 rounded-2xl transition-all duration-300 cursor-default ${cm.border}`}
    >

      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${cm.icon}`}>
        <skill.icon style={{ color: skill.color, fontSize: '24px' }} aria-hidden="true" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-semibold text-white text-sm">{skill.name}</span>
        <span className="text-xs text-slate-400 font-display">{label}</span>
      </div>

      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency ${skill.level}%`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${cm.bar}`}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const active = skillCategories.find((c) => c.id === activeCategory);

  const allUnique = skillCategories
    .flatMap((c) => c.skills)
    .filter((s, i, arr) => arr.findIndex((x) => x.name === s.name) === i);

  return (
    <section id="skills" className="relative section-padding overflow-hidden bg-[#0a0a14]">
      <FloatingOrbs count={2} />
      <div className="dot-pattern absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          subtitle="Technologies and tools I use to bring ideas from concept to production."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Skill categories">
          {skillCategories.map((cat) => {
            const cm = categoryColorMap[cat.color];
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id={`skills-tab-${cat.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`skills-panel-${cat.id}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold font-display border transition-all duration-200 ${
                  isActive
                    ? cm.tab
                    : 'bg-white/3 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.title}
                <span className="ml-2 text-xs opacity-60">({cat.skills.length})</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={activeCategory}
              id={`skills-panel-${activeCategory}`}
              role="tabpanel"
              aria-labelledby={`skills-tab-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {active.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  categoryColor={active.color}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card border border-white/5 rounded-2xl p-6"
        >
          <p className="text-center text-slate-500 text-sm font-display mb-5 uppercase tracking-widest">
            All Technologies
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {allUnique.map((skill) => {

              const cat = skillCategories.find((c) =>
                c.skills.some((s) => s.name === skill.name)
              );
              const cm = cat ? categoryColorMap[cat.color] : null;
              return (
                <motion.span
                  key={skill.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/8 text-slate-300 text-xs font-display cursor-default transition-all duration-200 ${cm ? cm.badge : ''}`}
                >
                  <skill.icon style={{ color: skill.color, fontSize: '14px' }} aria-hidden="true" />
                  {skill.name}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
