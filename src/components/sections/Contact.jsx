import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FloatingOrbs from '../ui/FloatingOrbs';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'itxrauf99@gmail.com',
    href: 'mailto:itxrauf99@gmail.com',
    color: 'purple',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/mrrauf99',
    href: 'https://github.com/mrrauf99',
    color: 'slate',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'abdulrauf-dev',
    href: 'https://www.linkedin.com/in/abdulrauf-dev/',
    color: 'blue',
  },
];

const contactColorMap = {
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:border-purple-500/40',
  slate: 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:border-blue-500/40',
};

// ─── EmailJS credentials ───────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_znro6i9';
const EMAILJS_TEMPLATE_ID = 'template_vzxej7n';
const EMAILJS_PUBLIC_KEY = 'KkKYlwOgHF5swQpaS';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    let tempErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    } else if (formData.subject.trim().length < 3) {
      tempErrors.subject = 'Subject must be at least 3 characters';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const emailjs = await import('@emailjs/browser');

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(
        'Failed to send message. Please try again or email me directly at itxrauf99@gmail.com',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden bg-[#080812]">
      <FloatingOrbs count={3} />
      <div className="dot-pattern absolute inset-0 opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something"
          subtitle="Whether you have a project in mind, an opportunity to share, or just want to say hello, I'm always open to a conversation."
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="glass-card border border-white/5 rounded-2xl p-8">
              <h3 className="font-display font-bold text-white text-xl mb-2">Get In Touch</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                I'm currently open to <span className="text-purple-300">internships</span>,{' '}
                <span className="text-cyan-300">junior–mid full-stack roles</span>, and{' '}
                <span className="text-emerald-300">freelance projects</span>. Let's discuss how I can
                contribute to your team or project.
              </p>

              <div className="space-y-3">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group ${contactColorMap[info.color]}`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5">
                      <info.icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-display">{info.label}</div>
                      <div className="text-sm font-semibold text-white group-hover:text-inherit">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card border border-emerald-500/15 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-display font-semibold text-emerald-300 text-sm">
                  Available for Work
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Actively looking for opportunities. Response time is typically within{' '}
                <span className="text-white font-medium">24 hours</span>.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass-card border border-white/5 rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle size={56} className="text-emerald-400 mb-4" />
                  </motion.div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-purple-400 hover:text-purple-300 font-display underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-sm text-slate-400 font-display">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-sans ${
                          errors.name
                            ? 'border-red-500/30 focus:border-red-500/50 focus:bg-red-500/5'
                            : 'border-white/10 focus:border-purple-500/50 focus:bg-purple-500/5'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 font-display mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-sm text-slate-400 font-display">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-sans ${
                          errors.email
                            ? 'border-red-500/30 focus:border-red-500/50 focus:bg-red-500/5'
                            : 'border-white/10 focus:border-purple-500/50 focus:bg-purple-500/5'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 font-display mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-sm text-slate-400 font-display">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-sans ${
                        errors.subject
                          ? 'border-red-500/30 focus:border-red-500/50 focus:bg-red-500/5'
                          : 'border-white/10 focus:border-purple-500/50 focus:bg-purple-500/5'
                      }`}
                    />
                      {errors.subject && (
                        <p className="text-xs text-red-400 font-display mt-1">{errors.subject}</p>
                      )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-sm text-slate-400 font-display">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none font-sans ${
                        errors.message
                          ? 'border-red-500/30 focus:border-red-500/50 focus:bg-red-500/5'
                          : 'border-white/10 focus:border-purple-500/50 focus:bg-purple-500/5'
                      }`}
                    />
                      {errors.message && (
                        <p className="text-xs text-red-400 font-display mt-1">{errors.message}</p>
                      )}
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
                    >
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-display text-white transition-all disabled:opacity-70"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
