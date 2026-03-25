import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Award, Quote, Globe } from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-white dark:bg-black w-full text-black dark:text-white px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Info Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-sm font-bold uppercase tracking-wider">
                {t("about.badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t("about.title")}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {t("about.description")}
              </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { label: t("about.stats.projects"), icon: <Briefcase size={20} /> },
                { label: t("about.stats.platforms"), icon: <Globe size={20} /> },
                { label: t("about.stats.specialization"), icon: <Award size={20} /> },
                { label: t("about.stats.role"), icon: <MapPin size={20} /> }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-black/30 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                  <div className="text-black dark:text-white">{stat.icon}</div>
                  <div className="font-bold text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote / Visual Side */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black text-white dark:bg-white dark:text-black p-10 md:p-14 rounded-[3rem] relative shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Quote size={200} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="font-mono text-sm opacity-50 mb-10">
                {`// ${t("about.badge")}`}
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
                "{t("about.quote")}"
              </h3>

              <div className="flex items-center gap-4 pt-8 border-t border-white/10 dark:border-black/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-200 dark:to-gray-400 flex items-center justify-center font-black text-xl text-white dark:text-black">
                  {t("hero.name").split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-lg">{t("hero.name")}</div>
                  <div className="text-sm opacity-60">{t("about.location")}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
