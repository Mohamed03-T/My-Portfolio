import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control background blurring
      setScrolled(currentScrollY > 20);

      // Control visibility (Show on scroll up, hide on scroll down)
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.projects'), href: "#projects" },
    { name: t('nav.experience'), href: "#experience" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ease-in-out ${
      visible ? "translate-y-0" : "-translate-y-full"
    } ${
      scrolled 
        ? "py-2 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-white/10 shadow-lg" 
        : "py-6 bg-transparent"
    } text-black dark:text-white`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center group">
            <div className="relative overflow-hidden">
              <img 
                src={theme === "dark" ? "/Logo.png" : "/Logo-Black.png"} 
                alt="Logo" 
                className="h-16 w-auto transform transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className="relative py-2 text-sm uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-gray-300 dark:hover:border-white/20"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Dropdown */}
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 py-2 px-3 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-transparent hover:border-gray-300 dark:hover:border-white/20">
                <Globe size={18} />
                <span className="uppercase text-xs font-bold tracking-tighter">{i18n.language}</span>
              </button>
              <div className="absolute top-[calc(100%+8px)] right-0 rtl:right-auto rtl:left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl min-w-[140px]">
                {['en', 'ar', 'fr'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => changeLanguage(lang)} 
                    className={`px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-white/10 text-left transition-colors flex justify-between items-center ${i18n.language === lang ? 'bg-gray-50 dark:bg-white/5 font-bold' : ''}`}
                  >
                    <span>{lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : 'Français'}</span>
                    {i18n.language === lang && <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-x-0 top-[72px] h-fit max-h-[calc(100vh-72px)] overflow-y-auto bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-2xl z-[90] lg:hidden transition-all duration-500 ease-in-out origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
        <div className="flex flex-col p-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-wide hover:text-gray-500 dark:hover:text-gray-300 transition-colors block py-2 border-b border-gray-100 dark:border-white/5 last:border-0"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="pt-6 mt-2 border-t border-gray-200 dark:border-white/10">
            <p className="text-xs uppercase tracking-widest opacity-50 mb-3">{t('nav.select_language') || 'Select Language'}</p>
            <div className="grid grid-cols-3 gap-2">
              {['en', 'ar', 'fr'].map((lang) => (
                <button 
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`py-2 text-sm rounded-lg border ${i18n.language === lang ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold' : 'border-gray-200 dark:border-white/10'} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
