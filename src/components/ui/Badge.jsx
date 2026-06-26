

const Badge = ({ children, color = 'purple', size = 'sm' }) => {
  const colors = {
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
    slate: 'bg-slate-500/10 border-slate-500/20 text-slate-300',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium font-display ${colors[color] || colors.purple} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
