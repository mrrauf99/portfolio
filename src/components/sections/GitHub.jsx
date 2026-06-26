import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, ArrowUpRight, Users } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FloatingOrbs from '../ui/FloatingOrbs';

const statItems = [
  { icon: BookOpen, label: 'Public Repos', value: '20+', color: 'purple' },
  { icon: Star, label: 'Total Stars', value: '10+', color: 'cyan' },
  { icon: GitFork, label: 'Forks', value: '5+', color: 'emerald' },
  { icon: Users, label: 'Followers', value: '10+', color: 'blue' },
];

const colorMap = {
  purple: 'from-purple-500/20 to-purple-700/5 border-purple-500/20 text-purple-400',
  cyan: 'from-cyan-500/20 to-cyan-700/5 border-cyan-500/20 text-cyan-400',
  emerald: 'from-emerald-500/20 to-emerald-700/5 border-emerald-500/20 text-emerald-400',
  blue: 'from-blue-500/20 to-blue-700/5 border-blue-500/20 text-blue-400',
};

// Simulated contribution graph
const ContributionGraph = () => {
  const weeks = 26;
  const days = 7;
  const levels = [0, 1, 2, 3, 4];
  
  const getLevel = () => {
    const r = Math.random();
    if (r < 0.35) return 0;
    if (r < 0.55) return 1;
    if (r < 0.75) return 2;
    if (r < 0.88) return 3;
    return 4;
  };

  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => getLevel())
  );

  const levelColors = [
    'bg-white/5',
    'bg-purple-900/60',
    'bg-purple-700/70',
    'bg-purple-500/80',
    'bg-purple-400',
  ];

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-1 min-w-max">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (wi * 7 + di) * 0.002, duration: 0.3 }}
                className={`w-3 h-3 rounded-sm ${levelColors[level]} hover:ring-1 hover:ring-purple-400/50 transition-all cursor-default`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const GitHubSection = () => {
  return (
    <section id="github" className="relative section-padding overflow-hidden bg-[#0a0a14]">
      <FloatingOrbs count={2} />
      <div className="dot-pattern absolute inset-0 opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Activity"
          subtitle="Code speaks louder than words: explore my repositories, projects, and contributions."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="glass-card border border-white/5 hover:border-purple-500/20 rounded-2xl p-6 h-full flex flex-col gap-5 transition-all duration-300">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold font-display shadow-glow-purple">
                  AR
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">Abdul Rauf</h3>
                  <p className="text-slate-400 text-sm">@mrrauf99</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Full Stack Web Developer | Building modern web apps, AI tools, and digital experiences.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {statItems.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.03 }}
                    className={`flex flex-col items-center p-3 rounded-xl bg-gradient-to-br border ${colorMap[stat.color]} gap-1 transition-all`}
                  >
                    <stat.icon size={16} />
                    <span className="font-display font-bold text-white text-xl">{stat.value}</span>
                    <span className="text-slate-400 text-xs text-center">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="https://github.com/mrrauf99"
                target="_blank"
                rel="noopener noreferrer"
                id="github-profile-link"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold font-display text-white text-sm transition-all mt-auto"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d2d4e)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Github size={16} />
                View GitHub Profile
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contribution graph + repos */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contribution graph */}
            <div className="glass-card border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-white">Contribution Activity</h3>
                <span className="text-xs text-slate-500 font-display">Last 6 months</span>
              </div>
              <ContributionGraph />
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-xs text-slate-500">Less</span>
                {['bg-white/5', 'bg-purple-900/60', 'bg-purple-700/70', 'bg-purple-500/80', 'bg-purple-400'].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                ))}
                <span className="text-xs text-slate-500">More</span>
              </div>
            </div>

            {/* Pinned repos */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'article-hub', desc: 'Full-stack article publishing platform', lang: 'JavaScript', stars: 3, color: 'purple' },
                { name: 'botguard-lab', desc: 'AI-powered bot detection platform', lang: 'JavaScript', stars: 2, color: 'cyan' },
                { name: 'symptom-checker-ai', desc: 'ML-powered disease prediction', lang: 'Python', stars: 4, color: 'emerald' },
                { name: 'object-detection-app', desc: 'Real-time mobile object detection', lang: 'Dart', stars: 2, color: 'blue' },
              ].map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href="https://github.com/mrrauf99"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="glass-card border border-white/5 hover:border-purple-500/20 rounded-xl p-4 block transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} className="text-purple-400" />
                      <span className="font-display font-semibold text-white text-sm">{repo.name}</span>
                    </div>
                    <ArrowUpRight size={13} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-slate-400 text-xs mb-3">{repo.desc}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        repo.color === 'purple' ? 'bg-purple-400' :
                        repo.color === 'cyan' ? 'bg-cyan-400' :
                        repo.color === 'emerald' ? 'bg-emerald-400' : 'bg-blue-400'
                      }`} />
                      {repo.lang}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Star size={11} />
                      {repo.stars}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
