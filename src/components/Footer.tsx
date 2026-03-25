import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white border-t border-gray-200 dark:border-white/10 py-16 transition-colors duration-300" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{t('footer.name')}</h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm mb-3">{t('footer.role')}</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs leading-relaxed">{t('footer.description')}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/Mohamed03-T" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/mohamed-touti-medev" },
                { icon: <Mail className="w-6 h-6" />, href: "mailto:medev.codes@gmail.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center border border-black/30 dark:border-white/10 rounded-2xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 dark:text-gray-600 text-xs font-bold uppercase tracking-widest">{t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;