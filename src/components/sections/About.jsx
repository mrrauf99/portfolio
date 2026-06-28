import { motion } from 'framer-motion';
import { Code2, Layers, Database, Brain } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FloatingOrbs from '../ui/FloatingOrbs';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { stats } from '../../data/experience';

const statColors = ['purple', 'cyan', 'emerald', 'blue'];
const statColorClasses = {
  purple: 'from-purple-500 to-purple-700',
  cyan: 'from-cyan-500 to-cyan-700',
  emerald: 'from-emerald-500 to-emerald-700',
  blue: 'from-blue-500 to-blue-700',
};

const StatCard = ({ label, value, suffix, color, index }) => {
  const { count, ref } = useAnimatedCounter(value, 1800);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card-hover p-6 text-center"
    >
      <div
        className={`text-4xl font-bold font-display mb-1 bg-gradient-to-br ${statColorClasses[color]} bg-clip-text text-transparent`}
      >
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-400 font-display">{label}</div>
    </motion.div>
  );
};

const highlights = [
  {
    icon: Code2,
    title: 'Full Stack Excellence',
    desc: 'I work across the entire stack, crafting polished React UIs and building solid Node.js backends that scale.',
    color: 'purple',
  },
  {
    icon: Layers,
    title: 'Modern Architecture',
    desc: 'I design with clean code and separation of concerns in mind, whether it\'s REST APIs, component trees, or database schemas.',
    color: 'cyan',
  },
  {
    icon: Database,
    title: 'Database-Driven',
    desc: 'Experienced with both relational (PostgreSQL) and NoSQL (MongoDB) databases, with a focus on efficient data modeling.',
    color: 'emerald',
  },
  {
    icon: Brain,
    title: 'Intelligent Systems',
    desc: 'Beyond the web, I explore machine learning and AI-powered applications: from bot detection to disease prediction.',
    color: 'blue',
  },
];

const cardColorClasses = {
  purple: {
    icon: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    border: 'group-hover:border-purple-500/30',
  },
  cyan: {
    icon: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    border: 'group-hover:border-cyan-500/30',
  },
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    border: 'group-hover:border-emerald-500/30',
  },
  blue: {
    icon: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    border: 'group-hover:border-blue-500/30',
  },
};

const About = () => {
  return (
    <section id="about" className="relative section-padding overflow-hidden bg-[#080812]">
      <FloatingOrbs count={2} />
      <div className="dot-pattern absolute inset-0 opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="About Me"
          title="Turning Complex Problems into Elegant Software."
          subtitle="Dedicated developer with 1+ year building production software across the full stack."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold font-display text-white">
              Building with <span className="gradient-text">depth</span> and precision
            </h3>

            <p className="text-slate-400 leading-relaxed">
              I'm a dedicated Full Stack Developer with <span className="text-white font-medium">1+ year</span> of building
              production-ready software, spanning from multi-role publishing platforms to AI-powered detection
              systems. I work across the entire stack so I can own features end-to-end.
            </p>

            <p className="text-slate-400 leading-relaxed">
              My stack centres on <span className="text-purple-300 font-medium">React</span>,{' '}
              <span className="text-cyan-300 font-medium">Node.js & Express</span>, and databases like{' '}
              <span className="text-emerald-300 font-medium">PostgreSQL & MongoDB</span>.
              I've also shipped a Flutter mobile app with on-device ML and a scikit-learn disease
              prediction model, because good engineers aren't afraid to go beyond their comfort zone.
            </p>

            <p className="text-slate-400 leading-relaxed">
              I care about clean architecture, readable code, and shipping things that actually work in
              production, not just on localhost.
            </p>


            <div className="flex flex-wrap gap-3 pt-1">
              {['Clean Code', 'Scalable Systems', 'User-Centric Design', 'Problem Solving'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm font-medium font-display bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group glass-card p-5 border border-white/5 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${cardColorClasses[item.color].border}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${cardColorClasses[item.color].icon}`}
                >
                  <item.icon size={20} />
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-2">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              color={statColors[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
