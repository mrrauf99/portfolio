const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#060610]">
      {/* Subtle top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-center">
        <p className="text-slate-400 text-sm font-sans text-center">
          &copy; {year} Abdul Rauf. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
