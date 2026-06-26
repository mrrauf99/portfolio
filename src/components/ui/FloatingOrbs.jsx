import { motion } from 'framer-motion';

const FloatingOrbs = ({ count = 4 }) => {
  const orbs = [
    { width: 600, height: 600, top: '-10%', left: '-15%', color: 'rgba(124, 58, 237, 0.25)', duration: 20 },
    { width: 400, height: 400, top: '50%', right: '-10%', color: 'rgba(6, 182, 212, 0.2)', duration: 25 },
    { width: 500, height: 500, bottom: '-10%', left: '30%', color: 'rgba(16, 185, 129, 0.15)', duration: 22 },
    { width: 300, height: 300, top: '20%', left: '40%', color: 'rgba(59, 130, 246, 0.2)', duration: 18 },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.width,
            height: orb.height,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
