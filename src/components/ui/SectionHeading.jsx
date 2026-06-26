import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, subtitle, align = 'center', light = false }) => {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-cyan-500" />
          <span className="text-sm font-semibold tracking-widest uppercase text-purple-400 font-display">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-gradient-to-r from-cyan-500 to-purple-500" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 ${
          light ? 'text-white' : 'text-white'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} text-slate-400`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-6 h-0.5 w-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};

export default SectionHeading;
