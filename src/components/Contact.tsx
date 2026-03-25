import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Phone, Facebook } from 'lucide-react';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    subject: '' // Honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'cooldown'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for cooldown (Rate Limiting)
    const lastSent = localStorage.getItem('last_message_sent');
    if (lastSent && Date.now() - parseInt(lastSent) < 60000) { // 1 minute cooldown
      setStatus('cooldown');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    // Anti-spam: check if honeypot field is filled
    if (formState.subject) {
      console.log("Bot detected");
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6927d8a3-92d2-484d-b85c-636565115ab0",
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio: New message from ${formState.name}`,
          from_name: "Portfolio Contact Form",
          botcheck: ""
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Save timestamp to prevent immediate re-sending
        localStorage.setItem('last_message_sent', Date.now().toString());
        
        setStatus('success');
        setFormState({ name: '', email: '', message: '', subject: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: t('contact.info.email'),
      value: 'medev.codes@gmail.com',
      link: 'mailto:medev.codes@gmail.com'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: t('contact.info.linkedin'),
      value: 'linkedin.com/in/mohamed-touti-medev',
      link: 'https://www.linkedin.com/in/mohamed-touti-medev'
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: t('contact.info.github'),
      value: 'github.com/Mohamed03-T',
      link: 'https://github.com/Mohamed03-T'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: t('contact.info.whatsapp'),
      value: '+213 675 12 83 06',
      link: 'https://wa.me/213675128306'
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      label: 'Facebook',
      value: 'Medev Codes',
      link: 'https://www.facebook.com/share/1CeYc1fYB9/'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 border-t border-gray-200 dark:border-white/10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter"
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl border border-black/30 dark:border-white/10 h-full">
              <h3 className="text-2xl font-bold mb-6 leading-relaxed">
                {t('contact.pitch')}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className={`${isRtl ? 'mr-4' : 'ml-4'}`}>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{info.label}</p>
                      <p className="text-lg font-medium truncate max-w-[200px] md:max-w-full">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl border border-black/30 dark:border-white/10 space-y-6">
              {/* Honeypot field (hidden from users) */}
              <input 
                type="checkbox" 
                name="botcheck" 
                className="hidden" 
                style={{ display: 'none' }}
                onChange={(e) => setFormState({...formState, subject: e.target.checked ? 'true' : ''})}
              />
              
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-gray-500 mb-2">
                  {t('contact.form.name')}
                </label>
                <input 
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white dark:bg-black border border-black/30 dark:border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-gray-500 mb-2">
                  {t('contact.form.email')}
                </label>
                <input 
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white dark:bg-black border border-black/30 dark:border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-gray-500 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white dark:bg-black border border-black/30 dark:border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans"
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                    {t('contact.form.send')}
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-green-600 dark:text-green-400 text-center font-black uppercase text-sm tracking-widest">{t('contact.form.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 dark:text-red-400 text-center font-black uppercase text-sm tracking-widest">{t('contact.form.error') || "Something went wrong!"}</p>
              )}
              {status === 'cooldown' && (
                <p className="text-orange-600 dark:text-orange-400 text-center font-black uppercase text-sm tracking-widest">{t('contact.form.cooldown') || "Please wait before sending another message."}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
