import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cpu, Rocket, Briefcase, Globe, Monitor, Code } from "lucide-react";

export default function Experience() {
  const { t } = useTranslation();

  const timelineData = [
    {
      year: "2021",
      icon: <Code size={20} />,
      title: t("experience.items.2021.title"),
      description: t("experience.items.2021.description")
    },
    {
      year: "2022",
      icon: <Monitor size={20} />,
      title: t("experience.items.2022.title"),
      description: t("experience.items.2022.description")
    },
    {
      year: "2023",
      icon: <Globe size={20} />,
      title: t("experience.items.2023.title"),
      description: t("experience.items.2023.description")
    },
    {
      year: "2024",
      icon: <Briefcase size={20} />,
      title: t("experience.items.2024.title"),
      description: t("experience.items.2024.description")
    },
    {
      year: "2025",
      icon: <Rocket size={20} />,
      title: t("experience.items.2025.title"),
      description: t("experience.items.2025.description")
    },
    {
      year: "2026",
      icon: <Cpu size={20} />,
      title: t("experience.items.2026.title"),
      description: t("experience.items.2026.description")
    }
  ];

  const stats = [
    { label: t("experience.stats.projects"), value: "10+" },
    { label: t("experience.stats.tech"), value: "15+" },
    { label: t("experience.stats.platforms"), value: "3" },
    { label: t("experience.stats.automation"), value: t("experience.stats.yes") }
  ];

  return (
    <section id="experience" className="py-24 bg-white dark:bg-black w-full text-black dark:text-white px-6 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Title & Stats in one row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-20 border-b border-gray-100 dark:border-white/5 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              {t("experience.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {t("experience.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl border border-black/40 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 min-w-[140px]"
              >
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest opacity-50 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Full-width Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 transform md:-translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-12 relative">
            {timelineData.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal group ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full border-4 border-white dark:border-black bg-black dark:bg-white z-20 transform -translate-x-1/2 flex items-center justify-center text-white dark:text-black shadow-xl">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full ml-12 md:ml-0 md:w-[45%] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:border-black dark:hover:border-white/20 transition-all group-hover:shadow-2xl`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-black opacity-20">{item.year}</span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-white/10"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

