import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Smartphone, 
  Terminal, 
  Server, 
  Database, 
  Cpu, 
  Wrench,
  Layout
} from "lucide-react";

export default function Skills() {
  const { t } = useTranslation();

  const SKILL_CATEGORIES = [
    {
      id: "web",
      icon: <Monitor size={28} />,
      skills: ["Next.js", "React", "TypeScript", "Java EE", "TailwindCSS", "Shadcn/UI", "Responsive Design", "HTML", "CSS", "JavaScript"]
    },
    {
      id: "mobile",
      icon: <Smartphone size={28} />,
      skills: ["Flutter"]
    },
    {
      id: "desktop",
      icon: <Terminal size={28} />,
      skills: ["Electron", "JavaFX"]
    },
    {
      id: "backend",
      icon: <Server size={28} />,
      skills: ["Node.js", "Express", "NextAuth", "Prisma ORM", "REST APIs"]
    },
    {
      id: "database",
      icon: <Database size={28} />,
      skills: ["MySQL", "PostgreSQL", "SQLite", "Data Structuring"]
    },
    {
      id: "ai",
      icon: <Cpu size={28} />,
      skills: ["Applied AI", "AI Chatbots", "RPA", "Predictive Tasks", "Python"]
    },
    {
      id: "tools",
      icon: <Wrench size={28} />,
      skills: ["Git", "GitHub", "Vercel", "npm", "Electron Builder", "Android Studio"]
    },
    {
      id: "uiux",
      icon: <Layout size={28} />,
      skills: ["UI/UX Principles", "Figma Basics", "User Centered Design"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-[#050505] w-full text-black dark:text-white px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-20 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight"
          >
            {t("skills.title")}
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-black/40 p-8 rounded-3xl border border-black/30 dark:border-white/10 hover:border-black dark:hover:border-white/20 transition-all group"
            >
              <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-60">
                {t(`skills.groups.${cat.id}`) || cat.id}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-[13px] rounded-lg font-bold border border-transparent hover:border-gray-300 dark:hover:border-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
