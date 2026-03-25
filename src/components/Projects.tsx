import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Github, X, ChevronRight } from "lucide-react";

type Category = "all" | "saas" | "web" | "mobile" | "desktop";

interface Project {
  id: string;
  category: Category;
  localeKey: string;
  image: string;
  webLink?: string;
  githubLink?: string;
}

const ALL_PROJECTS: Project[] = [
  {
    id: "transly",
    category: "saas",
    localeKey: "transly",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400",
    webLink: "https://transly.medevcodes.me/",
  },
  {
    id: "ssm",
    category: "mobile",
    localeKey: "ssm",
    image: "/ssm.jpg",
  },
  {
    id: "library",
    category: "web",
    localeKey: "library",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: "carrental",
    category: "desktop",
    localeKey: "carrental",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: "remindme",
    category: "mobile",
    localeKey: "remindme",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: "motivme",
    category: "mobile",
    localeKey: "motivme",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: "deliveryadmin",
    category: "web",
    localeKey: "deliveryadmin",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: "translydesktop",
    category: "desktop",
    localeKey: "translydesktop",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400",
  }
];

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Category>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredProjects = filter === "all" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter((p) => p.category === filter);

  const selectedProject = ALL_PROJECTS.find(p => p.id === selectedId);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-black w-full text-black dark:text-white px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t("projects.title")}
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {t("projects.subtitle")}
          </p>
          <p className="text-sm font-medium text-black dark:text-white/70 italic">
            {t("projects.highlight")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {(["all", "saas", "web", "mobile", "desktop"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === cat 
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105" 
                  : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-black dark:hover:border-white"
              }`}
            >
              {t(`projects.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full font-sans">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layoutId={project.id}
                onClick={() => setSelectedId(project.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full cursor-pointer relative"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={project.image} alt={t(`projects.list.${project.localeKey}.title`)} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-black/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold shadow-lg">
                      {t(`projects.categories.${project.category}`)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-500 transition-colors">
                      {t(`projects.list.${project.localeKey}.title`)}
                    </h3>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {t(`projects.list.${project.localeKey}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal / Expanded View */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6"
              />
              <motion.div 
                layoutId={selectedId}
                className="fixed inset-4 md:inset-x-[15%] md:inset-y-[10%] bg-white dark:bg-[#0a0a0a] z-[101] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row font-sans"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-[110] p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>

                <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {t(`projects.categories.${selectedProject.category}`)}
                    </span>
                    <div className="flex gap-2">
                       {selectedProject.webLink && (
                        <a href={selectedProject.webLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:scale-110 transition-transform">
                          <Globe size={18} />
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:scale-110 transition-transform">
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                    {t(`projects.list.${selectedProject.localeKey}.title`)}
                  </h3>

                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-blue-500 pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
                    {t(`projects.list.${selectedProject.localeKey}.description`)}
                  </p>

                  <div className="space-y-8">
                    <section>
                      <h4 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                         {t("projects.details.problem")}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
                        {t(`projects.list.${selectedProject.localeKey}.problem`)}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                         {t("projects.details.role")}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t(`projects.list.${selectedProject.localeKey}.role`)}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                         {t("projects.details.learned")}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t(`projects.list.${selectedProject.localeKey}.learned`)}
                      </p>
                    </section>

                    <section className="pt-4 border-t border-gray-100 dark:border-white/5">
                      <h4 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">
                        {t("projects.details.technologies")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {t(`projects.list.${selectedProject.localeKey}.tech_stack`).split(',').map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/10">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
