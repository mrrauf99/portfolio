import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FloatingOrbs from '../ui/FloatingOrbs';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


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
      <div className="dot-pattern absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Work Together"
          subtitle="Whether you have a project in mind, an opportunity to share, or just want to say hello, I'm always open to a conversation."
        />

        <div className="max-w-xl mx-auto mt-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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
