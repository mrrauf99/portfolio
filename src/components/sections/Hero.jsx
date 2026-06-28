import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Github, Linkedin } from 'lucide-react';
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
  const duration = Math.abs(speed);

  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%' }}
      animate={{ rotate: speed > 0 ? 360 : -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <div
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        }}
      >
        <motion.div
          animate={{ rotate: speed > 0 ? -360 : 360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
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
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yPos = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: yPos, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060f 0%, #0a0a14 50%, #080816 100%)' }}
    >

      <FloatingOrbs count={4} />

      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />

      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 md:pt-24 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-3">
                <span className="text-white">Hi, I'm </span>
                <span className="gradient-text">Abdul Rauf</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <p
                className="text-2xl md:text-3xl font-display font-semibold text-slate-300"
                style={{ minHeight: '2.5rem' }}
              >
                <TypewriterText />
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 leading-relaxed max-w-lg mb-8 mx-auto lg:mx-0"
            >
              Passionate developer specializing in modern web applications, backend systems, database design, and intelligent software solutions. Building scalable digital experiences that matter. Currently open to full-time roles and freelance projects.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >

              <motion.a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-resume-view"
                aria-label="View Abdul Rauf's resume (opens in new tab)"
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(168, 85, 247, 0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold font-display text-white transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                <FileText size={16} aria-hidden="true" />
                View Resume
              </motion.a>

              <motion.a
                href="https://github.com/mrrauf99"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-link"
                aria-label="Visit Abdul Rauf's GitHub profile"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold font-display border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              >
                <Github size={16} aria-hidden="true" />
                GitHub
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/abdulrauf-dev/"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-linkedin-link"
                aria-label="Visit Abdul Rauf's LinkedIn profile"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold font-display border border-blue-500/25 text-blue-300 hover:text-blue-200 hover:border-blue-400/40 hover:bg-blue-500/5 transition-all duration-200"
              >
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
              </motion.a>
            </motion.div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
            aria-hidden="true"
          >

            <div className="transform scale-75 sm:scale-100 origin-center">

              <div className="relative w-72 h-72 md:w-80 md:h-80">

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

              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="absolute inset-6 rounded-full border border-white/10 overflow-hidden">
                <img
                  src="/Abdul_Rauf.jpeg"
                  alt="Abdul Rauf, Full Stack Web Developer"
                  className="w-full h-full object-cover object-center"
                  draggable="false"
                />
              </div>

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
          </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
