import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import {
  SiReact, SiNodedotjs, SiJavascript, SiMongodb,
  SiPostgresql, SiTailwindcss, SiExpress, SiGit
} from 'react-icons/si';
import FloatingOrbs from '../ui/FloatingOrbs';

const ROLES = [
  'MERN Stack Developer',
  'Full Stack Web Developer',
  'React Developer',
  'Node.js Developer',
  'Problem Solver',
];

const techIcons = [
  { Icon: SiReact, color: '#61DAFB', label: 'React', angle: 0 },
  { Icon: SiNodedotjs, color: '#339933', label: 'Node.js', angle: 45 },
  { Icon: SiJavascript, color: '#F7DF1E', label: 'JavaScript', angle: 90 },
  { Icon: SiMongodb, color: '#47A248', label: 'MongoDB', angle: 135 },
  { Icon: SiPostgresql, color: '#4169E1', label: 'PostgreSQL', angle: 180 },
  { Icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind', angle: 225 },
  { Icon: SiExpress, color: '#ffffff', label: 'Express', angle: 270 },
  { Icon: SiGit, color: '#F05032', label: 'Git', angle: 315 },
];

/**
 * Typewriter that cycles through ROLES with typing + deleting effect.
 * Fixed-height container prevents layout shift.
 */
const TypewriterText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const word = ROLES[currentIndex];

    const tick = () => {
      if (!isDeleting) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(tick, 75);
        } else {
          // Pause at full word before deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, 45);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? 45 : 75);
    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentIndex]);

  return (
    // Fixed height = tallest word height, prevents layout shift
    <span className="inline-block" aria-live="polite" aria-atomic="true">
      <span>{displayText}</span>
      <span
        className="ml-0.5 text-purple-400"
        style={{ animation: 'blink 1.1s step-end infinite' }}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
};

const OrbitalIcon = ({ Icon, color, label, angle, radius = 140, speed = 15 }) => {
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;

  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      <div
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
          className="group relative"
        >
          <div
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center"
            style={{
              boxShadow: `0 0 20px ${color}30`,
              border: `1px solid ${color}30`,
            }}
          >
            <Icon style={{ color, fontSize: '18px' }} aria-hidden="true" />
          </div>
          {/* Tooltip */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {label}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060f 0%, #0a0a14 50%, #080816 100%)' }}
    >
      {/* Floating orbs */}
      <FloatingOrbs count={4} />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm">
                <Sparkles size={14} className="text-purple-400" aria-hidden="true" />
                <span className="text-sm text-purple-300 font-medium font-display">
                  Available for Work
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-3">
                <span className="text-white">Hi, I'm </span>
                <span className="gradient-text">Abdul Rauf</span>
              </h1>
            </motion.div>

            {/* Typewriter subtitle — fixed height to prevent layout shift */}
            <motion.div variants={itemVariants} className="mb-6">
              <p
                className="text-2xl md:text-3xl font-display font-semibold text-slate-300"
                style={{ minHeight: '2.5rem' }}
              >
                <TypewriterText />
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 leading-relaxed max-w-lg mb-8 mx-auto lg:mx-0"
            >
              Passionate developer specializing in modern web applications, backend systems,
              database design, and intelligent software solutions. Building scalable digital
              experiences that matter.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                id="hero-view-projects"
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="relative px-8 py-4 rounded-full font-semibold text-white font-display overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" aria-hidden="true" />
                </span>
              </motion.button>

              {/* View Resume */}
              <motion.a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-resume-view"
                aria-label="View Abdul Rauf's resume in a new tab"
                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold font-display border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/50 hover:text-emerald-200 transition-all duration-200"
              >
                View Resume
              </motion.a>
            </motion.div>

          </motion.div>

          {/* ── Right — avatar + orbital icons ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Outer glow ring */}
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Spinning gradient ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #10b981, #7c3aed)',
                  padding: '2px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0a14]" />
              </motion.div>

              {/* Inner pulse */}
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Avatar center — real profile photo */}
              <div className="absolute inset-6 rounded-full border border-white/10 overflow-hidden">
                <img
                  src="/Abdul_Rauf.jpeg"
                  alt="Abdul Rauf, MERN Stack Developer"
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                />
              </div>

              {/* Orbital tech icons */}
              <div className="absolute inset-0" style={{ transform: 'none' }}>
                {techIcons.map((item, i) => (
                  <OrbitalIcon
                    key={item.label}
                    Icon={item.Icon}
                    color={item.color}
                    label={item.label}
                    angle={item.angle}
                    radius={i % 2 === 0 ? 145 : 155}
                    speed={i % 2 === 0 ? 20 : -25}
                  />
                ))}
              </div>
            </div>




          </motion.div>
        </div>


      </motion.div>
    </section>
  );
};

export default Hero;
