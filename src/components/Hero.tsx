import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import * as THREE from "three";

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  // استخراج الحركات (animations) مع المجسم
  const { scene, animations } = useGLTF('/model.glb');
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    // إصلاح مشكلة الحجم عند التحديث (Initial Scale Fix)
    if (groupRef.current) {
      groupRef.current.scale.set(3.5, 3.5, 3.5);
    }

    // تشغيل الحركة بتكرار كل 5 ثوانٍ
    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().fadeIn(0.5).play();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        
        // البدء من الإطار العاشر تقريباً (حوالي 0.4 ثانية) لتجنب T-pose في البداية
        action.time = 0.4;

        // إعداد التكرار كل 5 ثوانٍ بعد انتهاء الحركة
        const interval = setInterval(() => {
          action.reset().fadeIn(0.5).play();
          action.time = 0.4;
        }, 5000);

        return () => clearInterval(interval);
      }
    }
  }, [actions, names]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // حركة عائمة (طوفان) للمجسم للأعلى والأسفل مع الحفاظ على النزول لأسفل بمقدار -2.5
      groupRef.current.position.y = -3.4 + (Math.sin(clock.getElapsedTime() * 2) * 0.1);
    }
  });

  return (
    <primitive 
      ref={groupRef} 
      object={scene} 
      scale={2} // الحجم الافتراضي (صغير)
      position={[0, -2.5, 0]} 
    />
  );
}

// يمكننا تحميل المجسم مسبقاً في الخلفية لتسريع ظهوره
useGLTF.preload('/model.glb');

export default function Hero() {
  const { t, i18n } = useTranslation();

  return (
    <section id="home" className="relative md:min-h-screen pt-24 pb-16 md:pt-0 md:pb-0 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-black w-full text-black dark:text-white px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full z-10 gap-12">
        
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-center md:text-start rtl:md:text-right"
        >
          <div className="inline-block px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold tracking-widest uppercase mb-2">
            {t("hero.name")}
          </div>
          <h1 className={`${i18n.language === 'fr' ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'} font-extrabold tracking-tight dark:text-white rtl:font-sans`}>
            {t("hero.title")}
          </h1>
          <p className={`${i18n.language === 'fr' ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0 leading-relaxed rtl:font-sans`}>
            {t("hero.subtitle")}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4 rtl:sm:flex-row-reverse">
            <a href="#projects" className="px-5 py-3 md:px-8 md:py-4 border border-black dark:border-white rounded-lg font-bold text-center text-sm md:text-lg transition-transform hover:scale-105 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black whitespace-nowrap">
              {t("hero.cta2")}
            </a>
            <a href="/cv.pdf" download className="px-5 py-3 md:px-8 md:py-4 border border-black dark:border-white rounded-lg font-bold text-sm md:text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black whitespace-nowrap">
              <FileDown className="w-4 h-4 md:w-5 md:h-5" />
              {t("hero.cta3")}
            </a>
            <a href="#contact" className="px-5 py-3 md:px-8 md:py-4 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold text-center text-sm md:text-lg transition-transform hover:scale-105 whitespace-nowrap">
              {t("hero.cta1")}
            </a>
          </div>
        </motion.div>

        {/* 3D Section */}
        <div className="flex-1 h-[400px] md:h-[600px] w-full cursor-grab active:cursor-grabbing order-last md:order-none relative">
          {/* Overlay to block touch on mobile */}
          <div className="absolute inset-0 z-20 md:hidden" />
          <Canvas className="pointer-events-none md:pointer-events-auto">
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={3} />
            <directionalLight position={[-10, 10, -10]} intensity={2} />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
